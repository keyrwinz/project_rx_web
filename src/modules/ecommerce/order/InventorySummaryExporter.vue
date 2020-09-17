<template>
  <TemplateSummaryExport
    :propsData="data"
    ref="TemplateSummaryExport"
  >
  </TemplateSummaryExport>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
</style>
<script>
import DateManipulation from './handlers/dateManipulation.js'
import TemplateSummaryExport from './TemplateSummaryExporter.vue'
import AUTH from 'src/services/auth'
import PDF from './handlers/pdf'
import CSV from './handlers/csv'
import lodash from 'lodash'
export default {
  name: 'InventorySummaryExporter',
  components: {TemplateSummaryExport},
  data(){
    return {
      data: {
        headers: [
          {name: 'created_at', label: 'Date', type: 'date'},
          {name: 'title', label: 'Title', type: 'string'},
          {name: 'qty', label: 'Quantity', type: 'int'},
          {name: 'price', label: 'Price', type: 'money'},
          {name: 'total', label: 'Total', type: 'money'}
        ],
        body: null,
        total: [
          {name: 'sub_total', value: 0},
          {name: 'shipping_fee', value: 0},
          {name: 'tax', value: 0},
          {name: 'total', value: 100},
          {name: 'qty', value: 0},
          {name: 'price', value: 100}
        ],
        modalInfo: {
          id: 'InventorySummaryExporterModal',
          title: 'Summary of Inventory',
          type: 'inventory',
          date: DateManipulation.currentDate()
        },
        totals: {},
        excelTitle: 'Summary of Inventory',
        jsonData: [],
        queryDate: null
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
                widths: ['100%'],
                heights: 60,
                body: [
                  [{
                    stack: [{
                      text: this.data.modalInfo.title,
                      fontSize: 18
                    }, {
                      text: DateManipulation.currentDate(),
                      fontSize: 15
                    }],
                    style: 'filledHeader',
                    margin: [0, 10, 0, 0]}]
                ]
              },
              layout: 'noBorders'
            }
          ]
        }
        var footerPDF = function(currentPage, pageCount){
          return {
            columns: [
              {text: currentPage.toString() + ' of ' + pageCount, margin: [0, 0, 10, 0], style: 'footer'}
            ]
          }
        }
        var contentPDF = []
        var data = this.data.body
        for(let counter = 0; counter < data.length; counter++){
          this.data.body = data[counter]
          this.setDataTotals(this.data.body)
          contentPDF.push(
            {text: '', margin: [0, 50]},
            {
              table: {
                headerRows: 1,
                widths: ['10%', '*', '10%', 'auto'],
                body: [
                  [{text: 'Order #', style: 'subheader'}, {text: this.data.body[0].order_number}, {text: 'Rider', style: 'subheader'}, {text: 'rider'}],
                  [{text: 'Location', style: 'subheader'}, {text: 'location'}, {text: 'Status', style: 'subheader'}, {text: 'status'}]
                ]
              },
              layout: 'noBorders'
            },
            {text: '', margin: [0, 30]},
            {
              table: {
                headerRows: 1,
                widths: [90, '*', 60, 80, 60],
                body: PDF.tableBodyGenerator(this.data)
              },
              layout: PDF.layout()
            },
            {text: '', margin: [0, 40]},
            {
              columns: [
                { width: '*', text: '' },
                {
                  width: 'auto',
                  table: {
                    headerRows: 1,
                    margin: [20, 20],
                    widths: [100, 120],
                    body: [
                      [{text: 'SubTotal', style: 'total'}, {text: 'Php ' + this.data.totals['sub_total'].toFixed(2), style: 'item'}],
                      // ['shippingFee', this.data.totals['shipping_fee']],
                      [{text: 'Tax', style: 'total'}, {text: 'Php ' + this.data.totals['tax'].toFixed(2), style: 'item'}],
                      [{text: 'Total', style: 'total'}, {text: 'Php ' + this.data.totals['total'].toFixed(2), style: 'item'}]
                    ]
                  },
                  layout: PDF.layout(),
                  pageBreak: 'after'
                }
              ]
            })
        }
        this.data.body = data
        var pageMargin = [10, 60, 10, 30]
        PDF.toPDF(headerPDF, footerPDF, contentPDF, pageMargin)
      }else{
        this.data.jsonData = CSV.toCSV(this.data, this.user, this.date, 'inventory')
      }
    },
    getTotal(data, type){
      return lodash.sumBy(data, (val) => {
        return val[type]
      })
    },
    setDataTotals(data){
      this.data.total[0].value = this.getTotal(data, 'sub_total')
      this.data.total[1].value = this.getTotal(data, 'shipping_fee')
      this.data.total[2].value = this.getTotal(data, 'tax')
      this.data.total[3].value = this.getTotal(data, 'total')
      this.data.total[4].value = this.getTotal(data, 'qty')
      this.data.total[5].value = this.getTotal(data, 'price')
      this.data.total.forEach(element => {
        this.data.totals[element.name] = element.value
      })
    }
  }
}
</script>
