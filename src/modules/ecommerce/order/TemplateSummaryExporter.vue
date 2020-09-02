<template>
  <div
    class="modal fade"
    :id="modalInfo.id"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="modalInfo.id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title w-100 text-center"  v-if="this.modalInfo.type === 'summary'" id="ModalTitle">{{modalInfo.title}}</h5>    
          <span class="modal-title w-100 text-center" v-if="this.modalInfo.type === 'inventory'" id="ModalTitle"><h5>{{modalInfo.title}}</h5>
            {{modalInfo.date}}    </span>  
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="this.modalInfo.type === 'summary'" style="text-align:center;margin-bottom:20px" >
            <h5>{{user.subAccount.merchant.name}}</h5>
            <p>
              {{user.subAccount.merchant.address}}
            </p>
          </div>
          <div v-if="this.modalInfo.type === 'inventory'" style="margin-bottom:20px" >
            <div class="row">
              <div class="col-md-3">
                <h6>Order #</h6>
                <h6>Location</h6>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-3">
                <h6>Rider</h6>
                <h6>Status</h6>
              </div>
            </div>
          </div>
          <table v-if="data.body !== null" class="table table-bordered table-responsive">
            <thead>
              <th v-for="(datum, index) in data.headers" :key="index">{{datum.label}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data.body" :key="index">
                <td
                  v-for="(label, index) in data.headers"
                  :key="index"
                >{{label.type === 'money' ?'PHP ' + item[label.name].toFixed(2) : item[label.name] }}</td>
              </tr>
              <tr v-if="data.body !== null">
                <td
                  v-for="(datum, index) in data.headers"
                  :key="index"
                >{{datum.type === 'money' ? 'PHP ' + total[datum.name].toFixed(2): index === 0 ? 'Total': ''}}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align:center;color:grey;margin-top:50px" v-else>
            <h3>Opps!!sorry no record :(</h3>
          </div>
          <span style="float:left;" v-if="data.body !== null">
            <p style="display:inline;font-weight:500">Date published</p>
            <span v-if="this.modalInfo.type === 'summary'">{{ this.modalInfo.date }}</span>
          </span>
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
          <vue-json-to-csv :json-data="jsonData" :csv-title="excelTitle" v-if="data.body !== null">
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
</style>
<script>
import CURRENCY from 'src/services/currency.js'
import VueJsonToCsv from 'vue-json-to-csv'
import AUTH from 'src/services/auth'
export default {
  name: 'TemplateSummaryExporter',
  components: {'vue-json-to-csv': VueJsonToCsv},
  data() {
    return {
      modalInfo: this.propsModalInfo,
      data: this.propsData,
      currency: CURRENCY,
      total: this.totalArr,
      jsonData: this.propsJsonData,
      user: AUTH.user,
      excelTitle: this.propsExcelTitle
    }
  },
  methods: {
    hideModal(){
      this.$parent.hideModal()
    },
    download(type){
      if(type === 'csv'){
        this.$parent.download(type)
      }
      if(type === 'pdf'){
        this.$parent.download(type)
      }
    }
  },
  props: ['propsData', 'totalArr', 'propsModalInfo', 'propsExcelTitle', 'propsJsonData'],
  watch: {
    propsJsonData: function(newVal, oldVal){
      this.jsonData = newVal
    }
  }
}
</script>
