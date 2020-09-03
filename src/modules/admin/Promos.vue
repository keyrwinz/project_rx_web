<template>
  <div class="ledger-summary-container">
    
    <management-options />
    <button class="btn btn-primary pull-right mb-1" @click="showModal('create', null)">Add Promo</button>
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead class="bg-primary">
        <tr>
          <td>Location</td>
          <td>Code</td>
          <td>Description</td>
          <td>Type</td>
          <td>Value</td>
          <td>Start Date</td>
          <td>End Date</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.scope === '' ? '': item.scope}}</td>
          <td>{{item.code}}</td>
          <td>{{item.description}}</td>
          <td>{{item.type}}</td>
          <td>{{currency.displayWithCurrency(item.value, 'PHP')}}</td>
          <td>{{item.start}} </td>
          <td>{{item.end}} </td>
          <td>
            <button class="btn btn-primary" @click="showModal('update', item)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null" :title="'No accounts available!'" :action="'Keep growing.'"></empty>
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      />
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
import CURRENCY from 'src/services/currency.js'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
import promosModal from './PromosModal.js'
export default {
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      limit: 5,
      activePage: 1,
      numPages: null,
      modalProperty: promosModal,
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
  mounted(){
    if(this.user.type !== 'ADMIN'){
      ROUTER.push('/marketplace')
    }
    this.retrieve()
  },
  methods: {
    showModal(action, item = null){
      if(action === 'create') {
        this.modalProperty = {...promosModal}
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
          route: 'coupons/update',
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
          if(input.variable === 'scope') {
            input.value = item.scope
          }
          if(input.variable === 'code') {
            input.value = item.code
          }
          if(input.variable === 'description') {
            input.value = item.description
          }
          if(input.variable === 'type'){
            input.value = item.type
          }
          if(input.variable === 'value'){
            input.value = item.value
          }
          if(input.variable === 'start'){
            input.value = item.start
          }
          if(input.variable === 'end'){
            input.value = item.end
          }
          this.modalProperty = {...modalData}
        })
      }
      $('#promosModal').modal('show')
    },
    retrieve(){
      let parameter = {
        sort: {
          created_at: 'desc'
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('coupons/retrieve', parameter).then(response => {
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
