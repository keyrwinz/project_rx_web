<template>
  <div>
    <div class="accordion shadow-sm border rounded mt-3 col-6 px-5 mx-auto pb-5" id="ledger">
      <h3 class="font-weight-bold text-center mt-5 mb-3">Payment History</h3>
      <div class="card" v-for="(item, index) in data" :key="index">
        <div class="card-header" :id="'heading-'+index">
          <button class="btn p-0 bg-transparent btn-block d-flex align-items-center" @click="changeIcon" type="button" data-toggle='collapse' :data-target="'#collapse-'+index" aria-expanded="false" :aria-controls="'collapse-'+index">

            <img :src="item.logo ? item.logo : defaultLogo" alt="logo" class="logo shadow-sm rounded-circle display-inline">

            <div class="col-auto text-left ml-3">
              <span class="font-weight-bold col-auto">{{item.name ? item.name : 'Anonymous'}}</span><br>
              <span class="text-muted col-auto">{{item.created_at ? formatDate(item.cash_methods_created) : 'No date specified'}}</span>
            </div>

            <div class="col-auto text-right ml-auto pr-0">
              <h5 class="d-inline" :class="item.amount > 0 ? 'text-success' : 'text-danger'">{{item.amount > 0 ? '+ ' : '- '}}{{item.amount > 0 ? currency.displayWithCurrency(item.amount, item.currency) : currency.displayWithCurrency(item.amount * -1, item.currency)}}</h5>
              <span class="text-muted">{{item.currency}}</span>
              <i class="fa fa-angle-up ml-4 text-muted arrow"></i>
            </div>
          </button>
        </div>

        <div :id="'collapse-'+index" class="collapse" :aria-labelledby="'heading-'+index" data-parent="#ledger">
          <div class="card-body border bg-light mx-4 mt-2">
            <p>{{item.description}}</p>
            <p><b>Mode of Payment:</b> {{item.payment_payload}}</p>
          </div>
        </div>
      </div>
      <empty-dynamic v-if="data === null" :title="'No current transactions'" :action="'Your ledger is currently empty'" :icon="'fa fa-coins'" :iconColor="'text-dark'"></empty-dynamic>
    </div>
  </div>
</template>
<style>
.empty {
  float: none !important;
}
</style>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";

  #ledger .logo{
    max-width: 40px !important;
  }

  #ledger > *:not(img){
    padding: 1.5rem .50rem !important;
  }

  #ledger .card {
    border: none;
    border-bottom: 1px dotted #bbb !important;
  }

  #ledger .card-header {
    border: none;
    background: transparent;
  }

  #ledger button:focus {
    outline: none;
    box-shadow: none;
  }

  .arrow {
    font-size: 16px;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
import moment from 'moment'
export default {
  mounted(){
    if(!this.user || this.user.type === 'USER') {
      // ROUTER.push('/featured')
      ROUTER.push('/welcome')
    }

    this.retrieve()
  },
  data() {
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      defaultLogo: require('assets/img/favicon-alt.png'),
      data: null
      // dataOld: [
      //   {amount: -4.99, description: 'Payment for Discord Nitro Classic', payment_payload: 'COP', currency: 'USD', created_at: '2020-07-24 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Discord Inc'}},
      //   {amount: -331.25, description: 'Phoenix Wright: The Ace Attorney', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-18 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
      //   {amount: -75, description: 'Spotify Premium', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-25 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Spotify Finance Limited'}},
      //   {amount: 127.47, description: 'Refund for games', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-25 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
      //   {amount: -534.50, description: 'Rise of the Tomb Raider', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-05 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
      //   {amount: 35, description: 'Commission', payment_payload: 'COD', currency: 'USD', created_at: '2020-05-10 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Leola Evans'}},
      //   {amount: -126.12, description: 'Chicken from Burger King', payment_payload: 'COD', currency: 'EUR', created_at: '2020-05-01 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Burger King'}}
      // ]
    }
  },
  components: {
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    retrieve() {
      let par = {
        code: this.user.code,
        offset: 0,
        limit: 5
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('ledger/retrieve_merchant', par).then(response => {
        $('#loading').css({display: 'none'})
        if(response.length > 0) {
          this.data = response
        } else {
          this.data = null
        }
      })
    },
    changeIcon(e){
      let card = $(e.target).parents('.card')
      let icon = $(card).find('.fa')
      if($(icon).hasClass('fa-angle-up')) {
        $(icon).removeClass('fa-angle-up')
        $(icon).addClass('fa-angle-down')
      } else {
        $(icon).removeClass('fa-angle-down')
        $(icon).addClass('fa-angle-up')
      }
    },
    formatDate(dateString) {
      return moment(dateString).format('DD MMM YYYY')
    }
  }
}
</script>
