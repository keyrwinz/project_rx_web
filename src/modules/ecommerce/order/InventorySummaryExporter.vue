<template>
  <TemplateSummaryExport
    :propsData="data"
    :totalArr="totals"
    :propsModalInfo ="modalinformation"
    :propsExcelTitle = "excelTitle"
    :propsJsonData = "jsonData"
  >
  </TemplateSummaryExport>
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
import TemplateSummaryExport from './TemplateSummaryExporter.vue'
export default {
  name: 'InventorySummaryExporter',
  components: {TemplateSummaryExport},
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
      modalinformation: {
        id: 'InventorySummaryExporterModal',
        title: 'Summary of Inventory',
        type: 'inventory',
        date: DateManipulation.currentDate()
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
      this.retrieve()
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
      console.log(parameter)
      $('#loading').css({display: 'block'})
      this.APIRequest('checkout_items/summary_of_inventory', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data.body = response.data
        }else{
          this.data.body = null
        }
        console.log(response.body)
        this.currentDate = DateManipulation.currentDate()
        this.queryDate = DateManipulation.dateFormat(new Date(this.date))
        this.data.total[0].value = this.getTotal('sub_total')
        this.data.total[1].value = this.getTotal('shipping_fee')
        this.data.total[2].value = this.getTotal('tax')
        this.data.total[3].value = this.getTotal('total')
        this.data.total.forEach(element => {
          this.totals[element.name] = element.value
        })
        $('#InventorySummaryExporterModal').modal('show')
      })
    }
  }
}
</script>
