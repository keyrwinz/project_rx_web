<template>
  <div>

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
      data: null,
      itemData: null
    }
  },
  components: {
    'mgtMenu': require('./managementMenu.vue')
  },
  props: ['title', 'action'],
  methods: {
    retrieve(){
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
          this.retrieveRiders()
        }
      })
    },
    retrieveItems(id) {
      let parameter = {
        condition: [{
          value: id,
          column: 'checkout_id',
          clause: '='
        }]
      }
      this.APIRequest('checkout_items/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        // console.log('sulod')
        console.log(response.data)
        if(response.data.length > 0){
          this.itemData = response.data
        } else {
          this.itemData = null
        }
      })
    },
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
