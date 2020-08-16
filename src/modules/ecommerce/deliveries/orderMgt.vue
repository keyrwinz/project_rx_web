<template>
  <div>
    <div class="col-12 display-4 text-center mb-2">
      <label class="text-primary">{{user.subAccount.merchant.name}}
      </label>
      Order History
    </div>
    <div class="col-8 p-0 mx-auto">
      <mgtMenu  :data="data"
                :modalButton="'Assign Rider'"></mgtMenu>
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
      user: AUTH.user,
      config: CONFIG,
      // data: [{ rider: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'In Progress', _rowVariant: 'warning' },
      //         { rider: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { rider: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
      //         { rider: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Cancelled', _rowVariant: 'danger' },
      //         { rider: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { rider: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
      //         { rider: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Not Received', _rowVariant: 'danger' },
      //         { rider: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
      //         { rider: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' }
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
    'mgtMenu': require('./mgtMenu.vue')
  },
  props: ['title', 'action'],
  methods: {
    retrieve(){
      // let parameter = {
      //   condition: [{
      //     value: this.user.userID,
      //     column: 'rider',
      //     clause: '='
      //   }]
      // }
      // this.APIRequest('merchants/retrieve', parameter).then(response => {
      //   if(response.data.length > 0){
      //     this.data = this.response.data
      //   }else{
      //     console.log('No Data Retrieved')
      //   }
      // })
      // console.log('retrieving...')
     // console.log(this.user)
      let parameter = {
        condition: [{
          value: this.user.subAccount.merchant.id,
          column: 'merchant_id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('checkouts/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          console.log('b4 retrieveRiders')
          console.log(this.data)
          this.retrieveRiders()
        }
      })
      parameter = {
        condition: [{
          value: this.data[0].id,
          column: 'checkout_id',
          clause: '='
        }]
      }
      this.APIRequest('checkout-items/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.itemData = response.data
          console.log('b4 retrieveRiders')
          console.log(this.itemData)
          this.retrieveRiders()
        }
      })
    },
    retrieveRiders() {
      console.log('hatdoggie')
      this.data.forEach((items, index) => {
        let parameter = {
          condition: [{
            value: items.account_id,
            column: 'account_id',
            clause: '='
          }]
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('account_informations/retrieve', parameter).then(response => {
          $('#loading').css({display: 'none'})
          if(response.data.length > 0){
            this.data[index].rider = response.data[0].first_name + ' ' + response.data[0].last_name
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
