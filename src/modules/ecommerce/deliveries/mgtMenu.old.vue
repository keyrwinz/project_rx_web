<template>
  <div>
    <b-table striped hover :items="data">
      <template v-slot:cell(action)="item">
        <span v-html="item.value"></span>
      </template>
    </b-table>
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
    this.retrieveMerchant({'title': 'asc'}, {column: 'title', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: {
    title: {
      required: false
    },
    action: {
      required: false
    },
    type: {
      required: false
    },
    data: {
      required: true
    }
  },
  methods: {
    // retrieve(){
    //   let parameter = {
    //     condition: [{
    //       value: this.user.userID,
    //       column: 'rider',
    //       clause: '='
    //     }]
    //   }
    //   this.APIRequest('merchants/retrieve', parameter).then(response => {
    //     if(response.data.length > 0){
    //       this.data = this.response.data
    //     }else{
    //       console.log('No Data Retrieved')
    //     }
    //   })
    // },

    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
