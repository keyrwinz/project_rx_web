<template>
  <div class="ledger-summary-container">
    
    <management-options />
    <div class="form-group">
      <button class="btn btn-primary pull-right mb-1" @click="showModal('create', null)">Add</button>
    </div>

    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Location</td>
          <td>Destination</td>
          <td>Minimum Amount</td>
          <td>Maximum Amount</td>
          <td>Charge</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.scope}}</td>
          <td>{{item.destination}}</td>
          <td>{{currency.displayWithCurrency(item.minimum_amount, item.currency)}}</td>
          <td>{{currency.displayWithCurrency(item.maximum_amount, item.currency)}}</td>
          <td>{{currency.displayWithCurrency(item.charge, item.currency)}}</td>
          <td>
            <button class="btn btn-primary" @click="showModal('update', item)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

     <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
      />

    <empty v-if="data === null" :title="'No fund transfer fee available!'" :action="'Click add button to start.'"></empty>
    <increment-modal :property="modalProperty"></increment-modal>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.bg-primary{
  background-color: $primary !important; 
  color: white !important;
}
.fa{
  padding-right: 0px !important;
}
</style>

<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import CURRENCY from 'src/services/currency.js'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
import propertyModal from './FundTransferFeesModal.js'

export default{
  mounted(){
    if(this.user.type !== 'ADMIN'){
      ROUTER.push('/marketplace')
    }
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      limit: 5,
      activePage: 1,
      numPages: null,
      modalProperty: propertyModal,
      currency: CURRENCY
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'management-options': require('modules/admin/Menu.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue'),
    Pager
  },
  methods: {
    showModal(action, item = null){
      if(action === 'create') {
        console.log(action)
        this.modalProperty = {...propertyModal}
        let inputs = this.modalProperty.inputs
        inputs.map(input => {
          input.value = null
        })
        let params = this.modalProperty.params
      }
      if(item !== null) {
        console.log(item)
        let modalData = {...this.modalProperty}
        let parameter = {
          title: 'Update Fund Transfer',
          route: 'fund_transfer_charges/update',
          button: {
            left: 'Cancel',
            right: 'Update'
          },
          params: [{
            variable: 'id',
            value: item.id
          }]
        }
        modalData = {...modalData, ...parameter}
        modalData.inputs.map(input => {
          if(input.variable === 'charge') {
            input.value = item.charge
          }
          if(input.variable === 'maximum_amount') {
            input.value = item.maximum_amount
          }
          if(input.variable === 'minimum_amount'){
            input.value = item.minimum_amount
          }
          if(input.variable === 'destination'){
            input.value = item.destination
          }
          if(input.variable === 'scope'){
            input.value = item.scope
          }
          if(input.variable === 'currency'){
            input.value = item.currency
          }
          this.modalProperty = {...modalData}
        })
      }
      $('#fundtransferFeeModal').modal('show')
    },
    retrieve(){
      let parameter = {
        sort: {
          created_at: 'desc'
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      this.APIRequest('fund_transfer_charges/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
        }else{
          this.data = null
          this.numPages = null
        }
      })
    }
  }
}
</script>
