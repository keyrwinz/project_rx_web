<template>
  <div class="ledger-summary-container">
    
    <management-options />
    <button class="btn btn-primary pull-right mb-1" @click="showModal('create', null)">Add</button>
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Location</td>
          <td>Minimum Charge</td>
          <td>Minimum Distance(Km)</td>
          <td>Addtional Charge per Km</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.scope}}</td>
          <td>{{currency.displayWithCurrency(item.minimum_charge, item.currency)}}</td>
          <td>{{item.minimum_distance}} Km</td>
          <td>{{currency.displayWithCurrency(item.addition_charge_per_distance, item.currency)}}</td>
          <td>
            <button class="btn btn-primary" @click="showModal('update', item)">
              <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-danger" @click="remove(item)">
              <i class="fa fa-trash"></i>
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

    <empty v-if="data === null" :title="'No delivery fee available!'" :action="'Click add button to start.'"></empty>
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
import propertyModal from './DeliveryFeeModal.js'
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
        this.modalProperty = {...propertyModal}
        let inputs = this.modalProperty.inputs
        inputs.map(input => {
          input.value = null
        })
        let params = this.modalProperty.params
      }
      if(item !== null) {
        let modalData = {...this.modalProperty}
        let parameter = {
          title: 'Update',
          route: 'delivery_fees/update',
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
          if(input.variable === 'addition_charge_per_distance') {
            input.value = item.addition_charge_per_distance
          }
          if(input.variable === 'minimum_distance') {
            input.value = item.minimum_distance
          }
          if(input.variable === 'minimum_charge'){
            input.value = item.minimum_charge
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
      $('#deliveryFeeModal').modal('show')
    },
    retrieve(){
      let parameter = {
        sort: {
          created_at: 'desc'
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      this.APIRequest('delivery_fees/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
        }else{
          this.data = null
          this.numPages = null
        }
      })
    },
    remove(id){
      let parameter = {
        id: id
      }
      this.APIRequest('delivery_fees/delete', parameter).then(response => {
        this.retrieve()
      })
    }
  }
}
</script>
