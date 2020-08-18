<template>
  <div class="order-holder">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    />
    <div class="form-group text-center" v-if="auth.user.orders.length > 0">
      <button class="btn btn-primary" @click="refresh()">
        New order
        <label class="badge badge-light">
          4
        </label>
      </button>
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
          Name
          <!-- <i class="fas fa-chevron-up pull-right action-link" @click="sortArrayName('desc')" v-if="activeSortName === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortArrayName('asc')" v-if="activeSortName === 'desc'"></i> -->
        </th>
        <th>
          Location
        </th>
        <th>
          Status
        </th>
        <th>
          Total Amount
        </th>
        <th>
          Actions
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
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.location}}
          </td>
          <td>
            <label class="badge text-uppercase" :class="{'badge-warning': item.status === 'pending', 'badge-success': item.status === 'completed', 'badge-danger': item.status === 'camcelled'}">{{item.status}}</label>
            <label class="badge">{{item.type}}</label>
          </td>

          <td>
            {{currency.displayWithCurrency(item.total, item.currency ? item.currency : 'PHP')}}
          </td>
          <td>
            <button class="btn btn-primary" @click="retrieveItems(item)">
              <i class="fa fa-eye"></i>
            </button>
            <button class="btn btn-success" @click="broadcastRiders(item)">
              <i class="fa fa-biking"></i>
            </button>
            <button class="btn btn-default" @click="broadcastRiders(item)">
              <i class="fa fa-print"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <viewProducts
      :data="selectedProducts"
      :checkout="selectedItem"
      ref="viewProducts"></viewProducts>

    <empty v-if="data === null" :title="'Orders will come soon!'" :action="'Keep going!'"></empty>
  </div>
</template>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .order-holder{  
    width: 90%;
    float: left;
    margin-right: 5%;
    margin-left: 5%;
    margin-top: 25px;
    margin-bottom: 50px;
  }
  i{
    padding-right: 0px !important;
  }

  .bg-primary{
    background-color: $primary !important;
    color: white
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CURRENCY from 'src/services/currency.js'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'components/increment/generic/pager/Pager.vue'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      numPages: null,
      activePage: 1,
      limit: 5,
      auth: AUTH,
      currency: CURRENCY,
      selectedItem: null,
      selectedProducts: null,
      data: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'viewProducts': require('components/increment/imarketvue/delivery/ViewProducts.vue'),
    Pager
  },
  methods: {
    broadcastRiders(item){
      // broadcasting here
    },
    refresh(){
      AUTH.user.orders = []
      this.retrieve()
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.subAccount.merchant.id,
          column: 'merchant_id',
          clause: '='
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
      })
    },
    retrieveItems(item){
      this.selectedItem = item
      let parameter = {
        condition: [{
          value: item.id,
          column: 'checkout_id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('checkout_items/retrieve_on_orders', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.selectedProducts = response.data
          this.$refs.viewProducts.showModal()
        }else{
          this.selectedProducts = null
          this.selectedItem = null
        }
      })
    }
  }
}
</script>
