<template>
  <div class="order-holder">
    <div class="form-group">
      <input type="date" class="form-control form-control-custom" v-model="date">
      <div class="dropdown" style="display:inline">
        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" style="margin-left: 5px;">Export<span class="caret"></span></button>
        <ul class="dropdown-menu">
          <button class="btn btn-light" style="width:100%;text-align:left;" @click="exportFile('orders_summary')" >Summary of Orders</button>
          <button class="btn btn-light" @click="exportFile('inventory_summary')" style="text-align:left">Summary of Inventory</button>
        </ul>
      </div>
      <button class="btn btn-warning" @click="searchByDate()">Search</button>
    </div>
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
<!--         <th>
          Name
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'name')" v-if="sort.name === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'name')" v-if="sort.name === 'desc'"></i>
        </th> -->
        <th>
          Location
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'location')" v-if="sort.location === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'location')" v-if="sort.location === 'desc'"></i>
        </th>
        <th>
          Delivered by
          <i class="fas fa-chevron-up pull-right action-link" @click="sortData('desc', 'delivered')" v-if="sort.delivered === 'asc'"></i>
          <i class="fas fa-chevron-down  pull-right action-link" @click="sortData('asc', 'delivered')" v-if="sort.delivered === 'desc'"></i>
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
            <button class="btn btn-success" @click="broadcastRiders(item)" v-if="item.status === 'pending' && item.assigned_rider === null">
              <i :class="{'fa fa-biking': waitingBroadcast.indexOf(item.id) < 0, 'fas fa-spinner fa-spin': waitingBroadcast.indexOf(item.id) >= 0}"></i>
            </button>
            <button class="btn btn-warning" @click="generatePdf(item)">
              <i class="fa fa-print"></i>
            </button>
            <button class="btn btn-primary" @click="showModal(item)">
              <i class="fas fa-map-marker-alt"></i>
            </button>
            <button class="btn btn-warning" @click="showMessage(item)">
              <i class="fas fa-envelope"></i>
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
    <viewProducts
      :data="selectedProducts"
      :dataAdded="dataAdded"
      :checkout="selectedItem"
      v-if="selectedItem !== null"
      ref="viewProducts"></viewProducts>
    <DeliveryConfirmation
      v-if="auth.user.riders.length > 0"
      @updateRow="manageUpdateRow"
      ref="confirmedRiderModal"
    ></DeliveryConfirmation>
    <InventorySummaryExporter
      :date="date"
      ref="InventorySummaryExporter"
    ></InventorySummaryExporter>
     <OrdersSummaryExporter
      :date="date"
      ref="OrdersSummaryExporter"
    ></OrdersSummaryExporter>
    <empty v-if="data === null" :title="'Orders will come soon!'" :action="'Keep going!'"></empty>


    <GoogleMapModal ref="mapModal" :place_data="locations" :propStyle="propStyle" v-if="locations.length > 0"></GoogleMapModal>
    <!-- <support-messenger :messages="messages" v-if="messages !== null"></support-messenger> -->
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
  .form-control-custom{
    width: 200px !important;
    float: left;
  }

  @media (max-width: 992px) {
    .form-control-custom{
      width: 120.7px !important;
      float: left;
    }
    .form-control {
      font-size: 12px !important;
    }
  }
</style>
<script>
import pdfFonts from 'pdfmake/build/vfs_fonts'
import PDFTemplate from 'pdfmake'
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CURRENCY from 'src/services/currency.js'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'components/increment/generic/pager/Pager.vue'
import Echo from 'laravel-echo'
import DatePicker from 'vue2-datepicker'
import DeliveryConfirmation from 'src/modules/ecommerce/rider/Confirmed.vue'
import DateManipulation from './handlers/dateManipulation.js'
import OrdersSummaryExporter from './OrdersSummaryExporter.vue'
import InventorySummaryExporter from './InventorySummaryExporter.vue'
import GoogleMapModal from 'src/components/increment/generic/map/ModalGeneric.vue'
import TemplatePdf from './Template.js'
export default {
  mounted(){
    if(this.user.type === 'USER' || this.user.type === 'RIDER') {
      // ROUTER.push('/featured')
      ROUTER.push('/marketplace')
    }
    this.retrieve()
    const {vfs} = pdfFonts.pdfMake
    PDFTemplate.vfs = vfs
  },
  data(){
    return {
      dataAdded: null,
      PdfTemplate: TemplatePdf,
      user: AUTH.user,
      config: CONFIG,
      numPages: null,
      activePage: 1,
      limit: 5,
      auth: AUTH,
      currency: CURRENCY,
      selectedItem: null,
      selectedProducts: [],
      data: null,
      sort: {
        date: 'asc',
        name: 'asc',
        order_number: 'asc',
        location: 'asc',
        status: 'asc',
        total: 'asc'
      },
      waitingBroadcast: [],
      date: null,
      locations: [],
      propStyle: {
        'margin-top': '10vh !important;'
      },
      messages: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'viewProducts': require('components/increment/imarketvue/delivery/ViewProducts.vue'),
    Pager,
    DatePicker,
    DeliveryConfirmation,
    OrdersSummaryExporter,
    InventorySummaryExporter,
    GoogleMapModal,
    'support-messenger': require('components/increment/messengervue/overlay/Holder.vue')
  },
  methods: {
    showMessage(item){
      this.messages = item
    },
    exportFile(name){
      if(this.date != null){
        if(name === 'orders_summary'){
          this.$refs.OrdersSummaryExporter.showModal()
        }
        if(name === 'inventory_summary'){
          this.$refs.InventorySummaryExporter.showModal()
        }
      }
    },
    showModal(item){
      let parameter = {
        condition: [{
          value: item.location_id,
          column: 'id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('locations/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.locations = [{
            longitude: parseFloat(response.data[0].longitude),
            latitude: parseFloat(response.data[0].latitude),
            route: response.data[0].route,
            locality: response.data[0].locality,
            country: response.data[0].country
          }]
          setTimeout(() => {
            this.$refs.mapModal.showModal()
          }, 100)
        }
      })
    },
    searchByDate(){
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
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('checkouts/retrieve_orders', parameter).then(response => {
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
    disabledDates(date) {
      return date > new Date()
    },
    manageUpdateRow(){
      let rider = AUTH.user.riders[0]
      this.data = this.data.map((item, index) => {
        if(parseInt(rider.checkout_id) === parseInt(item.id)){
          return {
            ...item,
            assigned_rider: rider.assigned_rider
          }
        }
        return item
      })
      this.$refs.confirmedRiderModal.hideModal()
      setTimeout(() => {
        AUTH.user.riders.splice(0, 1)
      }, 100)
    },
    broadcastRiders(item){
      // broadcasting here
      let parameter = {
        merchant: this.user.subAccount.merchant.code,
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
        },
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('checkouts/retrieve_orders', parameter).then(response => {
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
    retrieveItems(item){
      this.retrieve()
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
          this.dataAdded = item
          this.$refs.viewProducts.showModal()
        }else{
          this.selectedProducts = null
          this.selectedItem = null
        }
      })
    },
    generatePdf(item) {
      var merchant = this.user.subAccount.merchant
      this.selectedItem = item
      let parameter = {
        condition: [{
          value: item.id,
          column: 'checkout_id',
          clause: '='
        }]
      }
      this.APIRequest('checkout_items/retrieve_on_orders', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.PdfTemplate.getData(response.data)
          this.PdfTemplate.getItem(item, merchant)
          this.PdfTemplate.template()
        }
      })
    }
  }
}
</script>
