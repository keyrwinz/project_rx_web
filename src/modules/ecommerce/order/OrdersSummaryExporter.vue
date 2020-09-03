<template>
  <TemplateSummaryExport
      :propsData="data"
      :totalArr ="totals"
      :propsModalInfo ="modalinformation"
      :propsExcelTitle = "excelTitle"
      :propsJsonData = "jsonData"
    ></TemplateSummaryExport>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
</style>
<script>
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
import lodash from 'lodash'
import PDF from './handlers/pdf'
import CSV from './handlers/csv'
import DateManipulation from './handlers/dateManipulation.js'
import TemplateSummaryExport from './TemplateSummaryExporter'
export default {
  name: 'OrdersSummaryExporter',
  components: {TemplateSummaryExport},
  data(){
    return {
      data: {
        headers: [
          {name: 'date', label: 'Date', type: 'date'},
          {name: 'order_number', label: 'Order #', type: 'int'},
          {name: 'name', label: 'Customer', type: 'string'},
          {name: 'assigned_rider', label: 'Delivered by', type: 'string'},
          {name: 'sub_total', label: 'Subtotal', type: 'money'},
          {name: 'shipping_fee', label: 'Shipping Fee', type: 'money'},
          {name: 'tax', label: 'Tax', type: 'money'},
          {name: 'total', label: 'Total', type: 'money'}
        ],
        body: null,
        total: [
          {name: 'sub_total', value: 0},
          {name: 'shipping_fee', value: 0},
          {name: 'tax', value: 0},
          {name: 'total', value: 0}
        ]
      },
      modalinformation: {
        id: 'OrdersSummaryExporterModal',
        title: 'Summary of Orders',
        type: 'summary',
        date: DateManipulation.currentDate()
      },
      jsonData: [],
      currentDate: '',
      queryDate: '',
      excelTitle: 'Summary of Orders',
      user: AUTH.user,
      config: CONFIG,
      currency: CURRENCY,
      totals: {}
    }
  },
  props: ['date'],
  methods: {
    hideModal(){
      $('#OrdersSummaryExporterModal').modal('hide')
    },
    showModal(){
      this.retrieve()
    },
    download(type){
      if(type === 'pdf'){
        var headerPDF = {
          columns: [
            {
              table: {
                widths: ['*'],
                heights: 50,
                body: [[{ text: 'Summary of Orders', margin: [0, 15], style: 'filledHeader' }]]
              },
              layout: 'noBorders'
            }
          ]
        }
        var footerPDF = function(currentPage, pageCount){
          return {
            columns: [
              {text: 'Date Published ' + DateManipulation.currentDate(), margin: [10, 0, 0, 0]},
              {text: currentPage.toString() + ' of ' + pageCount, margin: [0, 0, 10, 0], style: 'footer'}
            ]
          }
        }
        var contentPDF = [
          {text: this.user.subAccount.merchant.name, margin: [0, 20, 0, 0], style: 'title'},
          {text: this.user.subAccount.merchant.address, style: 'header'},
          {text: this.queryDate, margin: [0, 0, 0, 30], style: 'header'},
          {
            table: {
              headerRows: 1,
              margin: [20, 20],
              widths: [70, 50, 60, 40, 70, 60, 60, '*'],
              body: PDF.tableBodyGenerator(this.data)
            },
            layout: PDF.layout(),
            pageBreak: 'after'
          }
        ]
        PDF.toPDF(headerPDF, footerPDF, contentPDF)
      }
      if(type === 'csv'){
        this.jsonData = CSV.toCSV(this.data, this.user, this.date, 'orders')
      }
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.subAccount.merchant.id,
          column: 'merchant_id',
          clause: '='
        },
        {
          value: this.date,
          column: 'created_at',
          clause: '>='
        },
        {
          value: DateManipulation.getNextDay(this.date),
          column: 'created_at',
          clause: '<'
        }],
        sort: {
          status: 'desc'
        }
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('checkouts/retrieve_orders', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data.body = response.data
        }else{
          this.data.body = null
        }
        this.currentDate = DateManipulation.currentDate()
        this.queryDate = DateManipulation.dateFormat(new Date(this.date))
        this.data.total[0].value = this.getTotal('sub_total')
        this.data.total[1].value = this.getTotal('shipping_fee')
        this.data.total[2].value = this.getTotal('tax')
        this.data.total[3].value = this.getTotal('total')
        this.data.total.forEach(element => {
          this.totals[element.name] = element.value
        })
        $('#OrdersSummaryExporterModal').modal('show')
      })
    },
    getTotal(type){
      return lodash.sumBy(this.data.body, (val) => {
        return val[type]
      })
    }
  }
}
</script>
