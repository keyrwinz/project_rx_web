<template>
  <TemplateSummaryExport
      :propsData="data"
      ref ='TemplateSummaryExport'
    ></TemplateSummaryExport>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
</style>
<script>
import DateManipulation from './handlers/dateManipulation.js'
import TemplateSummaryExport from './TemplateSummaryExporter'
import PDF from './handlers/pdf'
import CSV from './handlers/csv'
import AUTH from 'src/services/auth'
export default {
  name: 'OrdersSummaryExporter',
  components: {TemplateSummaryExport},
  data(){
    return {
      data: {
        headers: [
          {name: 'date', label: 'Date', type: 'date'},
          {name: 'order_number', label: 'Order #', type: 'string'},
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
        ],
        modalInfo: {
          id: 'OrdersSummaryExporterModal',
          title: 'Summary of Orders',
          type: 'summary',
          date: DateManipulation.currentDate()
        },
        totals: {},
        excelTitle: 'Summary of Orders',
        jsonData: [],
        queryDate: this.date
      },
      user: AUTH.user
    }
  },
  props: ['date'],
  methods: {
    showModal(){
      this.data.queryDate = this.date
      this.$refs.TemplateSummaryExport.retrieve()
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
          {text: this.data.queryDate, margin: [0, 0, 0, 30], style: 'header'},
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
        var pageMargin = [10, 60, 10, 30]
        PDF.toPDF(headerPDF, footerPDF, contentPDF, pageMargin)
      }
      if(type === 'csv'){
        this.data.jsonData = CSV.toCSV(this.data, this.user, this.date, 'orders')
      }
    }
  }
}
</script>
