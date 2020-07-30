<template>
  <div>
    <div class="col-12 display-4 text-center mb-2">
      <label class="text-primary">{{user.subAccount.merchant.name}}
      </label>
      Delivery History
    </div>
    <div class="col-8 p-0 mx-auto">
      <mgtMenu :data="items"></mgtMenu>
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
  },
  data(){
    return {
      data: null,
      user: AUTH.user,
      config: CONFIG,
      items: [{ name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'In Progress', _rowVariant: 'warning' },
              { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
              { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
              { name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Cancelled', _rowVariant: 'danger' },
              { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
              { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' },
              { name: 'Kent', locale: 'Mandaue', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'Not Received', _rowVariant: 'danger' },
              { name: 'Elle', locale: 'Cebu', source: 'Burger King Escario', destination: 'Tisa, Cebu City', status: 'Complete', _rowVariant: 'success' },
              { name: 'Ikaw L. Buot', locale: 'Lapu-lapu', source: 'McDonalds M.L. Quezon', destination: 'Pajo, Lapu-lapu City', status: 'Complete', _rowVariant: 'success' }
      ],
      fields: [
        { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
        { key: 'locale', label: 'Locale', sortable: true, class: 'text-center' },
        { key: 'source', label: 'Source', sortable: true, class: 'text-center' },
        { key: 'destination', label: 'Destination', sortable: true, class: 'text-center' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
        { key: 'isActive',
          label: 'is Active',
          formatter: (value, key, item) => {
            return value ? 'Yes' : 'No'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
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
    },
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
