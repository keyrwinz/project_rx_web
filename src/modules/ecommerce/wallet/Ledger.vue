<template>
  <div class="ledger-holder">
    <div class="accordion shadow-sm border rounded" id="ledger">
      <h3 class="font-weight-bold mt-5 mb-3 text-center">Payment History</h3>
      <div v-for="(item, index) in data" :key="index" class="card ledger">
        <div class="card-header row m-0 align-items-center px-0">
          <div class="col-md-12 col-sm-12 p-0 text-gray">
            {{item.created_at_human}}
          </div>
          <div class="w-50 font-weight-bold p-0">{{item.description ? item.description : ''}}</div>
          <div class="w-50 text-right font-weight-bold" :class="item.amount > 0 ? 'text-success' : 'text-danger'">
            {{item.amount > 0 ? '+ ' : '- '}}{{item.amount > 0 ? currency.displayWithCurrency(item.amount, item.currency) : currency.displayWithCurrency(item.amount * -1, item.currency)}}
          </div>
        </div>
      </div>
      <div v-if="data !== null" class="text-center">
        <button class="btn btn-primary rounded" @click="retrieve(limit + 5)" v-if="!showButton">Show more</button>
        <button class="btn btn-primary rounded" @click="retrieve(5)" v-if="showButton">Show less</button>
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
  .ledger-holder{
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
  }
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
  @media (max-width: 992px) {
    .col-6{
      max-width: 100%;
      flex: 0 0 100%;
    }
    .ledger-holder{
      width: 100%;
      margin-left: 0%;
      margin-right: 0%;
    }
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
      ROUTER.push('/marketplace')
    }
    this.retrieve(this.limit)
  },
  data() {
    return {
      showButton: false,
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      defaultLogo: require('assets/img/favicon-alt.png'),
      data: null,
      offset: 0,
      limit: 5,
      dataLength: 0
    }
  },
  components: {
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    retrieve(limit) {
      let parameter = {
        account_id: this.user.userID,
        account_code: this.user.code,
        offset: this.offset * limit,
        limit: limit
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('ledger/history', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0) {
          let array = null
          if(this.data){
            array = response.data
          }else{
            array = response.data
          }
          this.data = array
          if(this.dataLength === response.data.length){
            this.showButton = true
          }else {
            this.limit = limit
            this.showButton = false
            this.dataLength = response.data.length
          }
          // this.offset = this.offset
        } else {
          if(this.offset === 0){
            this.data = null
          }
        }
      })
    }
  }
}
</script>
