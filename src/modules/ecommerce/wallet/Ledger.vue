<template>
  <div>
    <div class="container shadow-sm border rounded mt-3 col-6 px-5">
      <h3 class="font-weight-bold text-center mt-5 mb-3">Payment History</h3>
      <table class="table ledger align-middle">
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="text-center font-weight-bold" style="width: 10%">
              <img :src="item.merchant.logo" alt="logo" class="logo shadow-sm rounded-circle">
            </td>
            <td>
              <span class="font-weight-bold col-auto">{{item.merchant.name}}</span><br>
              <span class="text-muted col-auto">{{formatDate(item.created_at)}}</span>
            </td>
            <td class="text-right">
              <h5 class="d-inline" :class="item.amount > 0 ? 'text-success' : 'text-danger'">{{item.amount > 0 ? '+ ' : '- '}}{{item.amount > 0 ? item.amount : item.amount * -1}}</h5>
              <span class="text-muted">{{item.currency}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";

  .ledger .logo{
    max-width: 40px !important;
  }

  .ledger td{
    padding: 1.5rem .50rem !important;
  }

  .ledger tr:not(:first-child) td:not(:first-child) {
    border-top: 1px dotted #ddd !important;
  }

  .ledger td:first-child {
    border-top: none !important;
  }

  .ledger tr:first-child td {
    border-top: none !important;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import moment from 'moment'
export default {
  mounted(){
  },
  data() {
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      data: [
        {amount: -4.99, description: 'Payment for Discord Nitro Classic', payment_payload: 'COP', currency: 'USD', created_at: '2020-07-24 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Discord Inc'}},
        {amount: -331.25, description: 'Phoenix Wright: The Ace Attorney', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
        {amount: -75, description: 'Spotify Premium', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Spotify Finance Limited'}},
        {amount: 127.47, description: 'Refund for games', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
        {amount: -534.50, description: 'Rise of the Tomb Raider', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'wwww.steampowered.com'}},
        {amount: 35, description: 'Commission', payment_payload: 'COD', currency: 'USD', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Leola Evans'}},
        {amount: -126.12, description: 'Chicken from Burger King', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-26 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Burger King'}}
      ]
    }
  },
  methods: {
    retrieve() {
      let par = {
        condition: [{
          value: this.user.userID,
          clause: '=',
          column: 'account_id'
        }],
        sort: {'created_at': 'desc'}
      }

      this.APIRequest('ledger/retrieve', par).then(response => {
        if(response.data.length > 0) {
          this.data = response.data
        } else {
          this.data = null
        }
      })
    },
    formatDate(dateString) {
      return moment(dateString).format('DD MMM YYYY')
    }
  }
}
</script>
