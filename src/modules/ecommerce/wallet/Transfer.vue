<template>
  <div class="modal fade" id="transferFunds" tabindex="-1" role="dialog" aria-labelledby="transferHead" aria-hidden="true">
    <div class="modal-dialog modal-lg ">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" aria-label="Close" @click="hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body px-5 row m-0">
          <h2 class="text-center font-weight-lighter col-12" id="transferHead">Transfer to your bank</h2>
          <div class="container-fluid mt-4 col-6">
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

          <div class="container-fluid mt-4 col-6">
            <b class="ml-5">Pick your currency</b>
            <div class="row mb-0 mt-3 mx-3 flex-column">
              <div class="col-12 py-2 form-group row mx-0 align-items-center bank" v-for="(item, index) in balance.filter(bal => bal.balance > 0)" :key="index">
                <input type="radio" name="currency" :id="'currency-'+index" :value="item.id" v-model="selectedCurrency">
                <label :for="'currency-'+index" class="ml-2 mb-0">
                    <b>{{item.currency}}</b>
                </label>
              </div>
            </div>
          </div>

          <div class="container-fluid row justify-content-center mb-4 mt-1">
            <button class="btn btn-primary rounded-pill col-3 py-3 mx-auto">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";

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
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      selectedBank: null,
      selectedCurrency: null,
      banks: [
        {id: 12, name: 'Visa Card', type: 'card', number: '1234123487'},
        {id: 24, name: 'Bank (Landbank)', type: 'bank', number: '1237928427'},
        {id: 32, name: 'Bank (BDO)', type: 'bank', number: '1293128348'}
      ],
      balance: [
        {id: 2, balance: 3}
      ]
    }
  },
  props: {
    balance: {
      required: true
    }
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
      $('#transferFunds').modal('hide')
    }
  }
}
</script>
