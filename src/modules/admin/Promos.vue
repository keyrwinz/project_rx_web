<template>
  <div class="ledger-summary-container">
    
    <management-options />

    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      />

    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead class="bg-primary">
        <tr>
          <td>Date</td>
          <td>Username</td>
          <td>Email</td>
          <td>Type</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
        </tr>
      </tbody>
    </table>

    <empty v-if="data === null" :title="'No accounts available!'" :action="'Keep growing.'"></empty>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
export default {
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      limit: 5,
      activePage: 1,
      numPages: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'management-options': require('modules/admin/Menu.vue'),
    Pager
  },
  mounted(){
    if(this.user.type !== 'ADMIN'){
      ROUTER.push('/marketplace')
    }
    this.retrieveCoupon()
  },
  methods: {
    retrieveCoupon(){
      $('#loading').css({display: 'block'})
      this.APIRequest('coupons/retrieve').then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
        console.log(response)
      })
    }
  }
}
</script>
