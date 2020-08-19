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
        New {{auth.user.orders.length > 1 ? 'orders' : 'order'}}
        <label class="badge badge-light">
          {{auth.user.orders.length}}
        </label>
      </button>
    </div>
    
    <table v-if="data !== null" class="table table-bordered table-responsive">
      <thead>
        <th>
          Date
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'date')" v-if="sort.date === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'date')" v-if="sort.date === 'desc'"></i>
        </th>
        <th>
          Order #
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'order_number')" v-if="sort.order_number === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'order_number')" v-if="sort.order_number === 'desc'"></i>
        </th>
        <th>
          Name
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'name')" v-if="sort.name === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'name')" v-if="sort.name === 'desc'"></i>
        </th>
        <th>
          Location
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'location')" v-if="sort.location === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'location')" v-if="sort.location === 'desc'"></i>
        </th>
        <th>
          Status
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'status')" v-if="sort.status === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'status')" v-if="sort.status === 'desc'"></i>
        </th>
        <th>
          Total Amount
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'total')" v-if="sort.total === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'total')" v-if="sort.total === 'desc'"></i>
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
            <button class="btn btn-success" @click="broadcastRiders(item)" v-if="item.status === 'pending'">
              <i :class="{'fa fa-biking': waitingBroadcast.indexOf(item.id) < 0, 'fas fa-spinner fa-spin': waitingBroadcast.indexOf(item.id) >= 0}"></i>
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
      v-if="selectedItem !== null"
      ref="viewProducts"></viewProducts>

    <empty v-if="data === null" :title="'Orders will come soon!'" :action="'Keep going!'"></empty>
  </div>
</template>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .order-holder{  
    width: 90%;
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

  .fa-spin{
    animation-duration: 0.50s;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CURRENCY from 'src/services/currency.js'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'components/increment/generic/pager/Pager.vue'
import Echo from 'laravel-echo'
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
      data: null,
      sort: {
        date: 'asc',
        name: 'asc',
        order_number: 'asc',
        location: 'asc',
        status: 'asc',
        total: 'asc'
      },
      waitingBroadcast: []
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
      let parameter = {
        merchant_id: this.user.subAccount.merchant.id,
        checkout_id: item.id
      }
      this.waitingBroadcast.push(item.id)
      this.APIRequest('riders/search', parameter).then(response => {
        AUTH.checkout = {
          searchingRider: false,
          id: item.id,
          rider: null,
          merchant: this.user.subAccount.merchant.id
        }
      })
    },
    sortData(order, column){
      this.sort[column] = order
      if(order === 'desc'){
        this.data = this.data.sort((a, b) => {
          return a[column] < b[column] ? -1 : 1
        })
      }else{
        this.data = this.data.sort((a, b) => {
          return a[column] > b[column] ? -1 : 1
        })
      }
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
