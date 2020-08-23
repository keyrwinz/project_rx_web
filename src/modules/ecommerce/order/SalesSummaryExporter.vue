<template>
  <div class="modal fade" id="SalesSummaryExporterModal" tabindex="-1" role="dialog" aria-labelledby="SalesSummaryExporterModal" aria-hidden="true">
    <div class="modal-dialog  modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="ModalTitle">Sales Summary</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="report">
            <table class="table table-bordered table-responsive">
              <tr>
                <th><p>Expected Total Sales:</p></th><td>PHP {{salesReport.expectedTotalSales.toFixed(2)}}</td>
              </tr>
              <tr>
                <th><p>Total Sales:</p></th><td>PHP {{salesReport.totalSales.toFixed(2)}}</td>
              </tr>
              <tr>
                <th><p>Total num of Transactions:</p></th><td>{{salesReport.totalTransac}}</td>
              </tr>
              <tr>
                <th><p>Completed Transactions:</p></th><td>{{salesReport.completedTransac}}</td>
              </tr>
              <tr>
                <th><p>Pending Transactions:</p></th><td>{{salesReport.pendingTransac}}</td>
              </tr>
              <tr>
                <th><p>Cancelled Transactions:</p></th><td>{{salesReport.cancelledTransac}}</td>
              </tr>
            </table>
        </div>  
           <table v-if="data !== null" class="table table-bordered table-responsive">
            <thead>
              <th>
                Date
              </th>
              <th>
                Order #
              </th>
              <th>
                Location
              </th>
              <th>
                Delivered by
              </th>
              <th>
                Status
              </th>
              <th>
                Total Amount
              </th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <td>
                  {{item.date}}
                </td>
                <td>
                  {{item.order_number}}
                </td>
                  <!--<td>
                  {{item.name}}
                </td> -->
                <td>
                  <label :title="item.location" :alt="item.location">
                    {{item.location !== null && item.location.length > 20 ? item.location.substring(0, 20) + '...' : item.location}}
                  </label>
                </td>
                <td class="text-uppercase">
                  {{item.assigned_rider}}
                </td>
                <td>
                 <label >{{item.status}}</label>                
                  <label >- {{item.type}}</label>
                </td>

                <td>
                  {{currency.displayWithCurrency(item.total, item.currency ? item.currency : 'PHP')}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="download('pdf')">Download as PDF</button>
          <button type="button" class="btn btn-primary" @click="download('csv')">Download as CSV</button>
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
  #report{
    width: 60%;
  }
  #report p{
    font-weight: bold
  }
  #report th{
    width: 50%;
  }
  /* Important part */
  .modal-dialog{
    overflow-y: initial !important
  }
  .modal-body{
     height: 430px;
    overflow-y: auto;
  }
</style>
<script>
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
import lodash from 'lodash'
import SummaryExporter from './SummaryExporter.js'
export default {
  name: 'SummarySalesExporter',
  mounted(){},
  data(){
    return {
      data: {},
      salesReport: {
        expectedTotalSales: 0,
        totalSales: 0,
        totalTransac: 0,
        completedTransac: 0,
        pendingTransac: 0,
        cancelledTransac: 0
      },
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
        console.log('data', this.data)
        SummaryExporter.toPDF(this.data, this.salesReport)
      }else if(type === 'csv'){

      }
    },
    retrieve(){
      var tempDate = new Date(this.date)
      var nextDate = [tempDate.getFullYear(),
        tempDate.getMonth() + 1 < 10 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1,
        tempDate.getDate() + 1
      ].join('-')
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
          value: nextDate,
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
          this.data = response.data
        }else{
          this.data = null
        }
        this.salesReport.expectedTotalSales = this.getSales()
        this.salesReport.totalSales = this.getSales('completed')
        this.salesReport.totalTransac = this.getTransactionCount()
        this.salesReport.completedTransac = this.getTransactionCount('completed')
        this.salesReport.pendingTransac = this.getTransactionCount('pending')
        this.salesReport.cancelledTransac = this.getTransactionCount('cancelled')
      })
    },
    getSales(status = null){
      if(status === 'completed'){
        return lodash.sumBy(this.data, (val) => {
          if(val.status === 'completed'){
            return val.total
          }else{
            return 0
          }
        })
      }
      return lodash.sumBy(this.data, (val) => {
        return val.total
      })
    },
    getTransactionCount(type = null){
      let data = lodash.countBy(this.data, (val) => {
        return val.status
      })
      if(type === null){
        let count = 0
        for (const [key, value] of Object.entries(data)) {
          count += value
        }
        return count
      }
      if(type in data){
        return data[type]
      }
      return 0
    }
  }
}
</script>
