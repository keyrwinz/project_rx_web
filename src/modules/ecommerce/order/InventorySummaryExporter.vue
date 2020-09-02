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
      $('#InventorySummaryExporterModal').modal('show')
    }
  }
}
</script>
