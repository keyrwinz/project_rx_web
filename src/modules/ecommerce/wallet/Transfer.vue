<template>
  <div>
    <div class="modal fade" id="transferFunds" tabindex="-1" role="dialog" aria-labelledby="transferHead" aria-hidden="true">
      <div :class="['modal-dialog', {'modal-md': !next}]">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="close" aria-label="Close" @click="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

        <div class="modal-header">
          <h2 class="text-center font-weight-lighter col-12" id="transferHead">Transfer to your bank</h2>
        </div>

          <div class="modal-body px-5 row m-0"  v-if="!next">
            <div class="container-fluid col-6">
              <small class="ml-5">Typically in 1-4 business days <b>(Fees may apply)</b></small>
              <div class="row mb-3 mt-3 mx-3 flex-column">
                <div class="col-12 py-2 form-group row mx-0 align-items-center bank" v-for="(item, index) in banks" :key="index">
                  <input type="radio" name="bank" :id="'bank-'+index" :value="item.id" v-model="selectedBank">
                  <label :for="'bank-'+index" class="ml-2 mb-0 row align-items-center">
                    <div class="icon text-center mr-2">
                      <h3 v-if="item.type === 'card'" class="fa fa-credit-card"></h3>
                      <h3 v-else class="fa fa-university"></h3>
                    </div>
                    <div>
                      <b>{{item.name}}</b><br>
                      <small class="text-muted">&bull;&bull;&bull;&bull; {{item.number.slice(-4)}}</small>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="container-fluid col-6">
              <b class="ml-5">Pick your currency</b>
              <div class="row mb-0 mt-3 mx-3 flex-column">
                <div class="col-12 py-2 form-group row mx-0 align-items-center bank" v-for="(item, index) in balance.filter(bal => bal.balance > 0)" :key="index">
                  <input type="radio" name="currency" :id="'currency-'+index" :value="index" v-model="selectedCurrency">
                  <label :for="'currency-'+index" class="ml-2 mb-0">
                      <b>{{item.currency}}</b>
                  </label>
                </div>
              </div>
            </div>

            <div class="container-fluid row mb-4 mt-1">
              <button type="button" @click="setAmount()" id="next" class="btn btn-primary rounded-pill col-10 py-3 mx-auto">Next</button>
            </div>
          </div>

          <div class="modal-body px-5 row m-0" v-if="next">
            <div class="conainer-fluid col-12 row m-0">
              <input type="number" name="amount" id="amount" v-model="amount" autocomplete="off">
              <label for="amount" id="hide" class="mx-auto pr-2" :currency="balance[selectedCurrency].currency">{{currency.displayWithCurrency(amount, balance[selectedCurrency].currency)}}</label>
              <div class="col-12 mt-3 text-center" style="font-size: 1.2rem">
                <b>Available Balance</b> 
                <br>
                {{currency.displayWithCurrency(balance[selectedCurrency].balance, balance[selectedCurrency].currency)}}
              </div>
              <button class="btn btn-block mt-4 mb-4 mx-auto w-75 rounded-pill py-3 btn-primary" id="next" @click="transfer()">Transfer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <otp ref="otp"></otp>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";

  #transfer-p2 {
    display: none;
  }

  #amount {
    position: absolute;
    pointer-events: none;
    top: 0;
    z-index: -100;
  }

  #hide {
    position: relative;
    font-size: 40px;
    border-bottom: 1px solid transparent;
  }

  #hide::before {
    position: absolute;
    right: 0;
    content: '|';
    opacity: 0;
  }

  #hide::after {
    position: absolute;
    left: 100%;
    font-size: 16px;
    content: attr(currency);
  }

  #amount:focus ~ #hide {
    border-bottom-color: black;
  }

  #amount:focus ~ #hide::before {
    animation: 400ms blink alternate infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  #hide span {
    font-size: 14px;
  }

  .btn.btn-primary {
    height: unset !important;
  }

  .modal-header {
    border: none !important;
  }

  .font-weight-lighter {
    font-weight: lighter;
  }

  .icon {
    position: relative;
    height: 25px;
    width: 30px;
  }

  .row .bank {
    border-bottom: 1px dashed #ccc;
  }

  .row .bank:first-child {
    border-top: 2px solid #ccc;
  }

  .row .bank:last-child {
    border-bottom: 2px solid #ccc;
  }

  .modal-dialog {
    transition: 1000ms width ease-in-out;
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
  },
  data(){
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      amount: 0,
      next: false,
      selectedBank: null,
      selectedCurrency: null,
      banks: [
        {id: 12, name: 'Visa Card', type: 'card', number: '1234123487'},
        {id: 24, name: 'Bank (Landbank)', type: 'bank', number: '1237928427'},
        {id: 32, name: 'Bank (BDO)', type: 'bank', number: '1293128348'}
      ]
    }
  },
  props: {
    balance: {
      required: true
    }
  },
  components: {
    'otp': require('components/increment/generic/otp/Otp.vue')
  },
  methods: {
    retrieve(){
    },
    show(){
      $('#transferFunds').modal('show')
    },
    hide() {
      this.selectedBank = null
      this.selectedCurrency = null
      this.next = false
      $('#transferFunds').modal('hide')
    },
    setAmount() {
      $('#transferFunds .error').remove()
      if(!this.selectedBank && !this.selectedCurrency) {
        $('<div>', {
          class: 'text-danger col-8 pl-3 ml-3 mb-3 error',
          html: 'Please choose a bank and currency for transfer.'
        }).insertBefore('#transferFunds #next')
      } else {
        this.next = true
      }
    },
    transfer() {
      $('#transferFunds .error').remove()
      if(this.amount === 0 || this.amount === null) {
        $('<div>', {
          class: 'text-danger col-12 pl-3 mb-3 error text-center',
          html: 'Please enter an amount.'
        }).insertBefore('#transferFunds #next')
      } else if(this.amount > this.balance[this.selectedCurrency].balance) {
        $('<div>', {
          class: 'text-danger col-12 pl-3 mb-3 error text-center',
          html: 'Your balance is not enough.'
        }).insertBefore('#transferFunds #next')
      } else {
        this.$refs.otp.generateOTP()
      }
    },
    successOTP(){
      this.$refs.otp.hideModal()
      $('#transferFunds .error').remove()
      $('<div>', {
        class: 'text-success col-12 pl-3 text-center mb-3 error',
        html: 'Money transfer handling not yet made.'
      }).insertBefore('#transferFunds #next')
    }
  }
}
</script>
