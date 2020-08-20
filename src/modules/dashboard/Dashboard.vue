<template>
  <div style="margin-bottom: 200px;">
    <div class="container w-90 mx-auto mt-4 row">
      <div class="col-12">
        <h4 class="text-uppercase col-12">Hello, 
          <span class="text-primary" v-if="user.subAccount.merchant === null">{{user.username}}</span>
          <span class="text-primary" v-else>{{user.subAccount.merchant.name}}</span>
        </h4>
        <small v-if="user.subAccount.merchant === null" class="ml-3 text-danger">Looks like you haven't setup your business information! <b @click="redirect('/profile/merchant')" class="link text-danger">Click here</b> to start!</small>
      </div>
      <div class="col-6">
        <div class="col-12 mt-4 border bg-light shadow-sm p-3 row m-0 rounded-lg">
          <div class="col-8">
            <span v-on:click="redirect('/wallet')" class="font-weight-bold text-primary link">E-Wallet Balance</span>
          </div>
          <div class="col-auto ml-auto m=0">
            <button type="button" class="dropdown border-0 options rounded-circle" data-toggle="dropdown" id="balanceSettings" aria-haspopup="true" aria-expanded="false">
              <div class="sr-only">Balance Settings</div>
              <i class="fa fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right shadow-sm rounded" aria-labelledby="balanceSettings">
              <div class="dropdown-item" @click="redirect('/wallet')">
                Go to E-Wallet Balance
              </div>
              <div class="dropdown-item">
                Get Help
              </div>
            </div>
          </div>
          <div class="col-12">
            <span class="balance">
              {{balance !== null ? currency.displayWithCurrency(largest.balance, largest.currency) : 'No available balance'}}
            </span>
            <br>
            <span class="font-weight-bold text-muted" style="opacity: .7">{{balance === null ? '' : balance.length > 1 ? 'More Currency Available' : 'Available'}}</span>
          </div>
          <div class="col-12 mt-3" v-if="balance !== null">
            <button type="button" class="btn btn-outline-primary rounded-pill" @click="$refs.funds.show()">Transfer Funds</button>
          </div>
        </div>

        <div class="col-12 mt-4 border bg-light shadow-sm px-3 py-4 row m-0 rounded-lg">
          <div class="col-12 link text-primary row m-0 align-items-center" @click="redirect('/ledger')">
            <h5 class="col m-0 p-0 font-weight-bold">Recent Activity</h5>
            <h5 class="fa fa-arrow-right"></h5>
          </div>
          <div class="col-12 row m-0" v-if="ledger !== null">
            <div v-for="(item, index) in ledger" :key="index" class="card ledger col-12 py-2 px-0">
              <div class="card-header row m-0 align-items-center px-0">
                <div class="col-2 p-0 text-center">
                  <h5 class="text-muted text-uppercase font-weight-bold">{{item.cash_methods_created ? getMonth(item.cash_methods_created) : ''}}</h5>
                  <h5 class="text-muted font-weight-light" style="opacity: .7">{{item.cash_methods_created ? getDay(item.cash_methods_created) : ''}}</h5>
                </div>
                <div class="col-5 font-weight-bold p-0">{{item.name ? item.name : ''}}</div>
                <div class="col-5 text-right font-weight-bold" :class="item.amount > 0 ? 'text-success' : 'text-danger'">
                  {{item.amount > 0 ? '+ ' : '- '}}{{item.amount > 0 ? currency.displayWithCurrency(item.amount, item.currency) : currency.displayWithCurrency(item.amount * -1, item.currency)}}
                </div>
              </div>
            </div>
          </div>
          <empty-dynamic v-else :title="'No current transactions'" :action="'Your ledger is currently empty'" :icon="'fa fa-coins'" :iconColor="'text-dark'"></empty-dynamic>
        </div>
      </div>
    </div>

    <transfer ref="funds" :balance="balance"></transfer>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.w-90 {
  width: 90% !important;
}

.bg-primary{
  background: $primary !important;
}

.card, .card-header {
  background: transparent;
}

.card-header {
  border: none;
}

.card {
  border: none;
  border-bottom: 1px dotted #bbb !important;
}

.balance {
  font-size: 25px;
  font-weight: lighter;
}

button.dropdown:focus {
  box-shadow: none;
  outline: none;
}

.options {
  position: relative;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background: transparent;
}

.options:hover,
.options[aria-expanded=true] {
  background: #ddd;
  cursor: pointer;
}

.dropdown-item {
  padding: 10px 20px !important;
  height: fit-content !important;
}

.dropdown-item:hover {
  color: $primary;
  cursor: pointer;
}

h4 {
  font-family: 'Helvetica';
  font-style: oblique;
  font-weight: 900;
}

.text-primary {
  color: $primary !important;
}

.text-warning {
  color: $warning !important;
}

.text-black {
  color: #000 !important;
}

.text-success {
  color: $success !important;
}

.half-rule {
  margin-left: 0;
  text-align: left;
  width: 50%;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
import CURRENCY from 'src/services/currency.js'
import moment from 'moment'
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    if(!this.user || this.user.type === 'USER') {
      // ROUTER.push('/featured')
      ROUTER.push('/welcome')
    }

    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      largest: {balance: 0},
      balance: null,
      balanceOld: [
        {id: 10, balance: 3000, currency: 'PHP'},
        {id: 12, balance: 215, currency: 'USD'},
        {id: 22, balance: 4120, currency: 'EUR'}
      ],
      ledger: null,
      ledgerOld: [
        {amount: -4.99, description: 'Payment for Discord Nitro Classic', payment_payload: 'COP', currency: 'USD', created_at: '2020-07-24 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Discord Inc'}},
        {amount: -331.25, description: 'Phoenix Wright: The Ace Attorney', payment_payload: 'COD', currency: 'PHP', created_at: '2020-07-18 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
        {amount: -75, description: 'Spotify Premium', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-25 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'Spotify Finance Limited'}},
        {amount: 127.47, description: 'Refund for games', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-25 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}},
        {amount: -534.50, description: 'Rise of the Tomb Raider', payment_payload: 'COD', currency: 'PHP', created_at: '2020-06-05 06:18:31', merchant: {logo: require('assets/img/favicon-alt.png'), name: 'www.steampowered.com'}}
      ]
    }
  },
  props: {
  },
  components: {
    'cards': require('modules/ecommerce/marketplace/Cards.vue'),
    'transfer': require('modules/ecommerce/wallet/Transfer.vue'),
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
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
          this.ledger = response
        } else {
          this.ledger = null
        }
      })
      let walletPar = {
        account_id: this.user.userID,
        account_code: this.user.code
      }

      $('#loading').css({display: 'block'})
      this.APIRequest('ledger/summary', walletPar).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0) {
          this.balance = response.data
        } else {
          this.balance = null
        }

        if(this.balance !== null) {
          this.balance.map((bal, ind) => {
            if(bal.balance >= this.largest.balance) {
              this.largest = bal
            }
          })
        }
      })
    },
    getMonth(dateString) {
      return moment(String(dateString)).format('MMM')
    },
    getDay(dateString) {
      return moment(String(dateString)).format('DD')
    }
  }
}
</script>
