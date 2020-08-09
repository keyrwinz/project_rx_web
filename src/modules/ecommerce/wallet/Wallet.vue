<template>
  <div>
    <div class="container w-50 mx-auto border rounded-lg mt-3 shadow-sm p-5 bg-light">
        <div class="walletLogo mt-5 rounded-circle shadow mx-auto bg-primary">
          <img :src="require('src/assets/img/favicon-alt.png')" alt="Runway Logo" class="img-fluid">
        </div>
        
        <h5 class="text-center font-weight-bold title mt-4">E-Wallet Balance</h5>
        <div class="mt-4 balance text-center">{{currency.displayWithCurrency(largest.balance, largest.currency)}}</div>
        <div class="mt-1 font-weight-bold text-muted text-center">Highest Balance</div>
        
        <div class="container row w-75 justify-content-center m-0 mt-3 mx-auto pb-4 border-bottom border-bottom-lg">
          <button type="button" class="btn btn-outline-primary rounded-pill py-3 px-5 font-weight-bold" @click="$refs.otp.show()">Transfer Funds</button>
        </div>

        <div class="container row px-0 w-75 flow-column justify-content-center m-0 mt-3 mx-auto">
          <div class="card col-12" v-for="(item, index) in balance" :key="index">
            <div class="card-body row py-4 align-items-center">
              <h5 class="col-auto font-weight-bold">{{item.currency}}</h5>
              <div class="col-auto ml-auto">
                {{currency.displayWithCurrency(item.balance, item.currency)}}
              </div>
            </div>
          </div>
          <div class="card col-12">
            <div class="card-body text-center">
              Use your balance to buy, or withdraw it. OTP is required to withdraw money.
            </div>
          </div>
        </div>
    </div>

    <otp ref="otp"></otp>
    <transfer ref="funds" :balance="balance"></transfer>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";

  .card {
    background: transparent;
    border: none;
    border-bottom: 1px dotted #bbb !important;
  }

  .border-bottom-lg {
    border-bottom-width: 2px !important;
  }

  .title {
    font-family: 'Helvetica';
    font-weight: 900;
  }

  .balance {
    font-size: 30px;
    font-weight: lighter;
  }

  .walletLogo {
    height: 100px;
    width: 100px;
    overflow: hidden;
  }

  .bg-primary {
    background: $primary !important;
  }

  .walletLogo img {
    transform: scale(0.6)
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
import CURRENCY from 'src/services/currency.js'
export default {
  mounted(){
    if(!this.user || this.user.type === 'USER') {
      ROUTER.push('/featured')
    }

    this.balance.map((bal, ind) => {
      if(bal.balance >= this.largest.balance) {
        this.largest = bal
      }
    })
  },
  data() {
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      largest: {balance: 0},
      balance: [
        {balance: 3000, currency: 'PHP'},
        {balance: 215, currency: 'USD'},
        {balance: 120, currency: 'EUR'}
      ]
    }
  },
  components: {
    'otp': require('components/increment/generic/otp/Otp.vue'),
    'transfer': require('modules/ecommerce/wallet/Transfer.vue')
  },
  methods: {
    successOTP(){
      this.$refs.funds.show()
    }
  }
}
</script>
