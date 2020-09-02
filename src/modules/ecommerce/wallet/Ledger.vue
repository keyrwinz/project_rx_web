<template>
  <div>
    <div class="accordion shadow-sm border rounded mt-3 col-6 px-5 mx-auto pb-5" id="ledger">
      <h3 class="font-weight-bold mt-5 mb-3 text-center">Payment History</h3>
      <div class="card" v-for="(item, index) in data" :key="index">
        <div class="card-header" :id="'heading-'+index">
          <button class="btn p-0 bg-transparent btn-block d-flex align-items-center" @click="changeIcon" type="button" data-toggle='collapse' :data-target="'#collapse-'+index" aria-expanded="false" :aria-controls="'collapse-'+index">

            <div class="col-6">
              <span class="text-muted col-auto">{{item.created_at_human}}</span>
            </div>

            <div class="col-6 text-right">
              <h5 class="d-inline" :class="item.amount > 0 ? 'text-success' : 'text-danger'">{{item.amount > 0 ? '+ ' : '- '}}{{item.amount > 0 ? currency.displayWithCurrency(item.amount, item.currency) : currency.displayWithCurrency(item.amount * -1, item.currency)}}</h5>
              <i class="fa fa-angle-up ml-4 text-muted arrow"></i>
            </div>
          </button>
        </div>

        <div :id="'collapse-'+index" class="collapse" :aria-labelledby="'heading-'+index" data-parent="#ledger">
          <div class="card-body border bg-light">
            <p>{{item.description}}</p>
            <p><b>Mode of Payment:</b> {{item.payment_payload}}</p>
          </div>
        </div>
      </div>
      <div v-if="data !== null" class="text-center">
        <button class="btn btn-primary rounded" @click="retrieve(offset + 1)">Load more</button>
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
@media (max-width: 600px) {
  .col-6{
    max-width: 100%;
    flex: 0 0 100%;
  }
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

    this.retrieve(this.offset)
  },
  data() {
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG,
      currency: CURRENCY,
      defaultLogo: require('assets/img/favicon-alt.png'),
      data: null,
      offset: 0,
      limit: 5
    }
  },
  components: {
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    retrieve(offset) {
      let par = {
        account_id: this.user.userID,
        account_code: this.user.code,
        offset: offset * this.limit,
        limit: this.limit
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('ledger/history', par).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0) {
          let array = null
          if(this.data){
            array = [...this.data, response.data]
          }else{
            array = response.data
          }
          this.data = array
          this.offset = offset
        } else {
          if(offset === 0){
            this.data = null
          }
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
