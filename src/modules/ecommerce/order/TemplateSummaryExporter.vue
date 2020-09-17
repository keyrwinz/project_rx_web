<template>
  <div
    class="modal fade"
    :id="data.modalInfo.id"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="data.modalInfo.id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <!-- head -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title w-100 text-center"  v-if="data.modalInfo.type === 'summary'" id="ModalTitle">{{data.modalInfo.title}}</h5>    
          <span class="modal-title w-100 text-center" v-if="data.modalInfo.type === 'inventory'" id="ModalTitle"><h5>{{data.modalInfo.title}}</h5>
            {{data.modalInfo.date}}</span>  
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- subheaders -->
          <div v-if="data.modalInfo.type === 'summary'" style="text-align:center;margin-bottom:20px" >
            <h5>{{user.subAccount.merchant.name}}</h5>
            <p>
              {{user.subAccount.merchant.address}}
            </p>
          </div>
          <div v-if="data.modalInfo.type === 'inventory'" style="margin-bottom:20px" >
            <div class="row" id="subheader" v-if="data.body !== null">
              <div class="col-md-9">
                <div><span id="label">Order #</span><span> {{dataPaginated[0].order_number}}</span></div>
                <div><span id="label">Location</span><span> NA</span></div>        
              </div>
              <div class="col-md-3">
                <div><span id="label">Rider</span><span> NA</span></div>
                <div><span id="label">Status</span><span> {{dataPaginated[0].status}}</span></div>                
              </div>
            </div>
          </div>
          <!-- table -->
          <table v-if="data.body !== null" class="table table-bordered table-responsive">
            <thead>
              <th v-for="(datum, index) in data.headers" :key="index">{{datum.label}}</th>
            </thead>
            <!-- tbody for orders -->
            <tbody v-if="data.modalInfo.id === 'OrdersSummaryExporterModal'">
              <tr v-for="(item, index) in data.body" :key="index" >
                <td
                  v-for="(label, index) in data.headers"
                  :key="index"
                >{{label.type === 'money' ?'PHP ' + item[label.name].toFixed(2) : item[label.name] }}</td>
              </tr>
              <tr>
                <td
                  v-for="(datum, index) in data.headers"
                  :key="index"
                >{{datum.type === 'money' ? 'PHP ' + (data.totals[datum.name].toFixed(2)): index === 0 ? 'Total': datum.type === 'int' ? data.totals[datum.name] : ''}}</td>
              </tr>
            </tbody>
            <!-- tbody for inventory -->
            <tbody v-else>
              <tr v-for="(item, index) in dataPaginated" :key="index" >
                <td
                  v-for="(label, index) in data.headers"
                  :key="index"
                >{{label.type === 'money' ?'PHP ' + item[label.name].toFixed(2) : item[label.name] }}</td>
              </tr>
              <tr>
                <td
                  v-for="(datum, index) in data.headers"
                  :key="index"
                >{{datum.type === 'money' ? 'PHP ' + (data.totals[datum.name].toFixed(2)): index === 0 ? 'Total': datum.type === 'int' ? data.totals[datum.name] : ''}}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align:center;color:grey;margin-top:50px" v-else>
            <h3>Opps!!sorry no record :(</h3>
          </div>
          <span style="float:left;" v-if="data.body !== null && data.modalInfo.id !== 'InventorySummaryExporterModal'">
            <p style="display:inline;font-weight:500">Date published</p>
            <span v-if="data.modalInfo.type === 'summary'">{{ data.modalInfo.date }}</span>
          </span>
          <div v-if="data.body !== null && data.modalInfo.id === 'InventorySummaryExporterModal'" id="inventoryTotaldiv">
            <table class="table table-bordered table-responsive" >
              <tbody>
                <tr v-for="(item, index) in data.totals" :key="index">
                  <td v-if="index !== 'qty' && index !== 'price' ">{{index}}</td>
                  <td v-if="index !== 'qty' && index !== 'price' ">{{item === undefined ? 'NA' : item}}</td>
                </tr>
              </tbody>
            </table>
            <div style="float:right;">
            <Pager
              :actPage="activePage"
              :numberPages="numPages"
              v-if="data.body !== null && data.modalInfo.id === 'InventorySummaryExporterModal'"
            />
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <span
            style="margin-right:5%;color:#c5c5c5;font-weight:bold"  
            v-if="data.body === null"
          >cannot export an empty record. :(</span>
          <button
            type="button"
            class="btn btn-primary"
            v-if="data.body !== null"
            @click="download('pdf')"
          >Export as PDF</button>
          <vue-json-to-csv :json-data="data.jsonData" :csv-title="data.excelTitle" v-if="data.body !== null">
            <button
              type="button"
              class="btn btn-primary"
              v-if="data.body !== null"
              @click="download('csv')"
            >Download as CSV</button>
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
    background: $primary !important
  }
  .modal-dialog{
    overflow-y: initial !important
  }
  .modal-body{
    height: 70vh;
    overflow-y: auto;
  }
  #inventoryTotaldiv{
    width: 50%;
    min-height: 100px;
    float: right;
  }
  #subheader .col-md-3{
    float:right;
  }
  #subheader #label{
    font-weight: bold;
    padding-right: 3px;
  }
</style>
<script>
import CURRENCY from 'src/services/currency.js'
import VueJsonToCsv from 'vue-json-to-csv'
import AUTH from 'src/services/auth'
import lodash from 'lodash'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import DateManipulation from './handlers/dateManipulation.js'
import Pager from './Pager.vue'
export default {
  name: 'TemplateSummaryExporter',
  components: {
    'vue-json-to-csv': VueJsonToCsv,
    Pager
  },
  data() {
    return {
      data: this.propsData,
      currency: CURRENCY,
      user: AUTH.user,
      currentDate: '',
      config: CONFIG,
      path: '',
      numPages: 0,
      activePage: 1,
      limit: 1,
      inventoryDatum: []
    }
  },
  methods: {
    hideModal(){
      $('#' + this.data.modalInfo.id).modal('hide')
    },
    download(type){
      this.$parent.data = this.data
      this.$parent.download(type)
    },
    retrieve(){
      var parameter = {}
      var data = []
      if(this.data.modalInfo.id === 'OrdersSummaryExporterModal'){
        parameter = {
          condition: [{
            value: this.user.subAccount.merchant.id,
            column: 'merchant_id',
            clause: '='
          },
          {
            value: this.data.queryDate,
            column: 'created_at',
            clause: '>='
          },
          {
            value: DateManipulation.getNextDay(this.data.queryDate),
            column: 'created_at',
            clause: '<'
          }],
          sort: {
            status: 'desc'
          }
        }
        this.path = 'checkouts/retrieve_orders'
      }else{
        parameter = {
          merchant_id: this.user.subAccount.merchant.id,
          date: this.data.queryDate
        }
        this.path = 'checkout_items/summary_of_inventory_daily'
      }
      $('#loading').css({display: 'block'})
      this.APIRequest(this.path, parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(this.data.modalInfo.id === 'OrdersSummaryExporterModal'){
          data = response.data
        }else{
          data = lodash.map(response.data, (value) => {
            return value
          })
          this.inventoryDatum = data
          this.numPages = this.inventoryDatum.length
        }
        if(data.length > 0){
          if(this.data.modalInfo.id === 'OrdersSummaryExporterModal'){
            this.data.body = data
          }else{
            this.data.body = this.inventoryDatum
          }
          this.currentDate = DateManipulation.currentDate()
          this.setDataTotals(this.data.body)
        }else{
          this.data.body = null
        }
        $('#' + this.data.modalInfo.id).modal('show')
      })
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
      if(this.data.modalInfo.id !== 'OrdersSummaryExporterModal'){
        this.data.total[4].value = this.getTotal(data, 'qty')
        this.data.total[5].value = this.getTotal(data, 'price')
      }
      this.data.total.forEach(element => {
        this.data.totals[element.name] = element.value
      })
    }
  },
  props: ['propsData'],
  computed: {
    dataPaginated(){
      this.setDataTotals(this.inventoryDatum[this.activePage - 1])
      return this.inventoryDatum[this.activePage - 1]
    }
  }
}
</script>
