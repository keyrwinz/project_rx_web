<template>
  <div class="modal fade" id="InventorySummaryExporterModal" tabindex="-1" role="dialog" aria-labelledby="SummaryExporterModal" aria-hidden="true">
     <div class="modal-dialog  modal-md" role="document">
      <div class="modal-content" >
        <div class="modal-header bg-primary text-white" >
          <h5 class="modal-title w-100 text-center" id="ModalTitle">Summary of Inventory</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <TemplateSummaryExport
          :propsData="data"
          :totalArr="totals"
        >
        </TemplateSummaryExport>
        <div class="modal-footer">    
          <span style="margin-right:5%;color:#c5c5c5;font-weight:bold" v-if="data.body === null">cannot export an empty record. :( </span>  
          <button type="button" class="btn btn-primary" :disabled="data.body === null" @click="download('pdf')">Export as PDF</button>
          <vue-json-to-csv
          :json-data="[{name: 's'}, {name: 'sd'}]"
          :csv-title="excelTitle"
          v-if="data.body !== null"
          >
          <button type="button" class="btn btn-primary" :disabled="data.body === null" @click="download('csv')">Download as CSV</button>
          </vue-json-to-csv>
          <button type="button" class="btn btn-danger"  v-if="data.body !== null" @click="hideModal()">Close</button>
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
import TemplateSummaryExport from './TemplateSummaryExporter.vue'
export default {
  name: 'InventorySummaryExporter',
  components: {TemplateSummaryExport, VueJsonToCsv},
  data(){
    return {
      data: {
        headers: [
          {name: 'date', label: 'Date', type: 'date'},
          {name: 'title', label: 'Title', type: 'string'},
          {name: 'Quantity', label: 'Quantity', type: 'int'},
          {name: 'Price', label: 'Price', type: 'money'},
          {name: 'Total', label: 'Total', type: 'money'}
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
      excelTitle: 'Summary of Inventory',
      user: AUTH.user,
      config: CONFIG,
      currency: CURRENCY,
      totals: {}
    }
  },
  props: ['date'],
  methods: {
    hideModal(){
      $('#InventorySummaryExporterModal').modal('hide')
    },
    showModal(){
      $('#InventorySummaryExporterModal').modal('show')
    }
    // retrieve(){
    //   let parameter = {
    //     condition: [{
    //       value: this.user.subAccount.merchant.id,
    //       column: 'merchant_id',
    //       clause: '='
    //     },
    //     {
    //       value: this.date,
    //       column: 'created_at',
    //       clause: '>='
    //     },
    //     {
    //       value: DateManipulation.getNextDay(this.date),
    //       column: 'created_at',
    //       clause: '<'
    //     }],
    //     sort: {
    //       status: 'desc'
    //     }
    //   }
    //   $('#loading').css({display: 'block'})
    //   this.APIRequest('checkouts/retrieve_orders', parameter).then(response => {
    //     this.data.total.forEach(element => {
    //       this.totals[element.name] = element.value
    //     })
    //     $('#loading').css({display: 'none'})
    //     if(response.data.length > 0){
    //       this.data.body = response.data
    //     }else{
    //       this.data.body = null
    //     }
    //     this.currentDate = DateManipulation.currentDate()
    //     this.queryDate = DateManipulation.dateFormat(new Date(this.date))
    //     this.data.total[0].value = this.getTotal('sub_total')
    //     this.data.total[1].value = this.getTotal('shipping_fee')
    //     this.data.total[2].value = this.getTotal('tax')
    //     this.data.total[3].value = this.getTotal('total')
    //     $('#OrdersSummaryExporterModal').modal('show')
    //   })
    // },
    // getTotal(type){
    //   return lodash.sumBy(this.data.body, (val) => {
    //     return val[type]
    //   })
    // }
  }
}
</script>
