<template>
  <div>
    <div class="col-12 display-4 text-center mb-2">
      <label class="text-primary">{{user.subAccount.merchant.name}}
      </label>
      Delivery History
    </div>
    <div class="col-8 p-0 mx-auto">
      <mgtMenu  :data="data"
                :modalButton="'Temporary'"></mgtMenu>
    </div>
  </div>
</template>
<style lang="scss">
  @import "~assets/style/colors.scss";
  .border-primary{
    border-color: $primary !important;
  }
  .text-primary{
    color: $primary !important;
  }

  .empty{
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
    float: left;
    min-height: 450px;
    overflow-y: hidden;
    text-align: center;
    border: solid 1px #ddd;
  }

  .empty i{
    font-size: 100px;
    padding-top: 150px;
  }
  .empty span{
    width: 100%;
    float: left;
  }

  .empty .description{
    font-size: 24px;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import axios from 'axios'
export default {
  mounted(){
    // this.retrieveMerchant({'title': 'asc'}, {column: 'title', value: ''})
    this.retrieve()
  },
  data(){
    return {
      data: null,
      user: AUTH.user,
      config: CONFIG,
      // items: [{ name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'In Progress', _rowVariant: 'warning' },
      //         { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
      //         { name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Cancelled', _rowVariant: 'danger' },
      //         { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
      //         { name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Not Received', _rowVariant: 'danger' },
      //         { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' }
      // ],
      fields: [
        { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
        { key: 'locale', label: 'Locale', sortable: true, class: 'text-center' },
        { key: 'source', label: 'Source', sortable: true, class: 'text-center' },
        { key: 'destination', label: 'Destination', sortable: true, class: 'text-center' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  components: {
    'mgtMenu': require('./managementMenu.vue')
  },
  props: ['title', 'action'],
  methods: {
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'rider',
          clause: '='
        }]
      }
      this.APIRequest('merchants/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = this.response.data
        }else{
          console.log('No Data Retrieved')
        }
      })
      console.log('retrieving...')
      console.log(this.user)
      parameter = {
        condition: [{
          value: this.user.subAccount.merchant.id,
          column: 'merchant_id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('deliveries/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          console.log(this.data)
          console.log('b4 retrieveRiders')
          this.retrieveRiders()
        }
      })
    },
    retrieveRiders() {
      console.log('hatdoggie')
      this.data.forEach((items, index) => {
        let parameter = {
          condition: [{
            value: items.rider,
            column: 'account_id',
            clause: '='
          }]
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('account_informations/retrieve', parameter).then(response => {
          $('#loading').css({display: 'none'})
          if(response.data.length > 0){
            this.data[index].name = response.data[0].first_name + ' ' + response.data[0].last_name
            console.log('retrieving ridername')
            console.log(this.data)
          }
        })
        parameter = {
          condition: [{
            value: items.checkout_id,
            column: 'id',
            clause: '='
          }],
          inventory_type: COMMON.ecommerce.inventoryType,
          account_id: this.user.userID
        }
        console.log(parameter)
        this.APIRequest('products/retrieve', parameter).then(response => {
          if(response.data.length > 0){
            this.data[index].checkout_id = response.data[0].title
            this.data[index].productCode = response.data[0].code
          }
        })
      })
    },
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
