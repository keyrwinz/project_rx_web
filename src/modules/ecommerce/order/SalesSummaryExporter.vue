<template>
  <div class="modal fade" id="SalesSummaryExporterModal" tabindex="-1" role="dialog" aria-labelledby="SalesSummaryExporterModal" aria-hidden="true">
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
           <table v-if="data !== null" class="table table-bordered table-responsive">
            <thead>
              <th v-for="(data, index) in data.headers" :key="index">{{data.label}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data.body" :key="index">
                <td>
                  {{item.date}}
                </td>
                <td>
                  {{item.order_number}}
                </td>
                <td>
                  {{item.name}}
                </td>
                <td class="text-uppercase">
                  {{item.assigned_rider}}
                </td>
                <td>
                  <label >{{currency.displayWithCurrency(item.sub_total, item.currency ? item.currency : 'PHP')}}</label>                
                </td>
                <td>
                  <label >{{currency.displayWithCurrency(item.shipping_fee, item.currency ? item.currency : 'PHP')}}</label>                
                </td>
                <td>
                  <label >{{currency.displayWithCurrency(item.tax, item.currency ? item.currency : 'PHP')}}</label>                
                </td>
                <td>
                  {{currency.displayWithCurrency(item.total, item.currency ? item.currency : 'PHP')}}
                </td>
              </tr>
              <tr>
                <td><p style="font-weight:500">Total</p></td>
                <td></td><td></td><td></td>
                <td>PHP {{ data.total[0].value.toFixed(2)}} </td>
                <td>PHP {{ data.total[1].value.toFixed(2) }} </td>
                <td>PHP {{ data.total[2].value.toFixed(2) }} </td>
                <td>PHP {{ data.total[3].value.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>        
          <span style="float:left;"><p style="display:inline;font-weight:500">Date published </p><span>{{ currentDate }}</span></span>
        </div>
        <div class="modal-footer">    
          <span style="margin-right:5%;color:#c5c5c5;font-weight:bold" v-if="data.body === null">cannot export an empty record. :( </span>  
          <button type="button" class="btn btn-primary" :disabled="data.body === null" @click="download('pdf')">Export as PDF</button>
          <vue-json-to-csv
          :json-data="jsonData"
          :csv-title="excelTitle"
          >
          <button type="button" class="btn btn-primary" :disabled="data.body === null" @click="download('csv')">Download as CSV</button>
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
export default {
  name: 'SummarySalesExporter',
  components: {VueJsonToCsv},
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
        body: {
        },
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
      currency: CURRENCY
    }
  },
  props: ['date'],
  methods: {
    hideModal(){
      $('#SalesSummaryExporterModal').modal('hide')
    },
    showModal(){
      this.retrieve()
      $('#SalesSummaryExporterModal').modal('show')
    },
    download(type){
      if(type === 'pdf'){
        PDF.toPDF('Summary of Orders', this.data, this.user, this.queryDate)
      }
      if(type === 'csv'){
        this.jsonData = CSV.toCSV(this.data, this.user, this.date)
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
