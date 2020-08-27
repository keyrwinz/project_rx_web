<template>
  <div class="ledger-summary-container">
    
    <management-options />
    <div class="form-group">
      <button class="btn btn-primary pull-right">Add</button>
    </div>

    <table class="table table-bordered table-responsive">
      <thead class="bg-primary">
        <tr>
          <td>Location</td>
          <td>Destination</td>
          <td>Minimum Amount</td>
          <td>Maximum amount</td>
          <td>Charge</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
        </tr>
      </tbody>
    </table>

     <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      />

    <empty v-if="data === null" :title="'No fund transfer fee available!'" :action="'Click add button to start.'"></empty>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.bg-primary{
  background-color: $primary !important; 
  color: white !important;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
export default{
  mounted(){
    if(this.user.type !== 'ADMIN'){
      ROUTER.push('/marketplace')
    }
  },
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
  methods: {
  }
}
</script>
