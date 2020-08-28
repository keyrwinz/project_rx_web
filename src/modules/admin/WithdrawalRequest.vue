<template>
  <div class="ledger-summary-container">
    <management-options />
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Requested by</td>
          <td>Amount</td>
          <td>Via</td>
          <td>Charge</td>
          <td>Total</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.account_id}}</td>
          <td>{{currency.displayWithCurrency(item.amount, item.currency)}}</td>
          <td>
            {{item.payment_payload + '/' + item.payment_payload_value}}
          </td>
          <td>{{currency.displayWithCurrency(0, item.currency)}}</td>
          <td>{{currency.displayWithCurrency(item.amount, item.currency)}}</td>
          <td>
            <button class="btn btn-primary">
              <i class="fa fa-cog"></i>
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

    <empty v-if="data === null" :title="'No withdrawals available!'" :action="'Waiting for request.'"></empty>
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
    retrieve(){
      let parameter = {
        sort: {
          created_at: 'desc'
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      this.APIRequest('withdrawals/retrieve', parameter).then(response => {
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
