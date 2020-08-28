<template>
  <div class="modal fade" id="OrdersSummaryExporterModal" tabindex="-1" role="dialog" aria-labelledby="SummaryExporterModal" aria-hidden="true">
     <div class="modal-dialog  modal-md" role="document">
      <div class="modal-content" >
        <div class="modal-header bg-primary text-white" >
          <h5 class="modal-title w-100 text-center" id="ModalTitle">Summary of Orders</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div style="text-align:center;margin-bottom:20px">
            <h5>{{user.subAccount.merchant.name}}</h5>
            <p>{{user.subAccount.merchant.address}}<br>{{this.queryDate}}</p>
          </div>
          <TemplateSummaryExport
            :propsData="data"
            :totalArr ="totals"
          >
          </TemplateSummaryExport>
          <span style="float:left;" v-if="data.body !== null"><p style="display:inline;font-weight:500">Date published </p><span>{{ currentDate }}</span></span>
        </div>
        <div class="modal-footer">    
          <span style="margin-right:5%;color:#c5c5c5;font-weight:bold" v-if="data.body === null">cannot export an empty record. :( </span>  
          <button type="button" class="btn btn-primary" v-if="data.body !== null" @click="download('pdf')">Export as PDF</button>
          <vue-json-to-csv
          :json-data="jsonData"
          :csv-title="excelTitle"
          v-if="data.body !== null"
          >
          <button type="button" class="btn btn-primary" v-if="data.body !== null" @click="download('csv')">Download as CSV</button>
          </vue-json-to-csv>
          <button type="button" class="btn btn-danger" @click="hideModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
  .bg-primary{
    background: $primary !important;
  }
  .modal-dialog{
    overflow-y: initial !important
  }
  .modal-body{
    height: 70vh;
    overflow-y: auto;
  }
</style>
<script>
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
import lodash from 'lodash'
import PDF from './handlers/pdf'
import CSV from './handlers/csv'
import VueJsonToCsv from 'vue-json-to-csv'
import DateManipulation from './handlers/dateManipulation.js'
import TemplateSummaryExport from './TemplateSummaryExporter'
export default {
  name: 'OrdersSummaryExporter',
  components: {TemplateSummaryExport, VueJsonToCsv},
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
