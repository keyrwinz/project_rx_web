<template>
  <div class="locations">
    <div class="header row justify-content-between align-items-center">
      <span class="ml-2 title">Locations</span>
      <button class="btn btn-primary"> <span class="fa fa-plus mr-2"></span> Add Location</button>
    </div>
    <span class="content">
      <empty-dynamic :title="'No Locations'" :action="'Add the location of your branches'" :icon="'fa fa-building'" :iconColor="'text-danger'"></empty-dynamic>
    </span>
  </div>
</template>
<style scoped lang="scss">
  @import "~assets/style/colors.scss";
  .locations {
    width: 95%;
    float: left;
    margin-left: 5%;
    margin-bottom: 200px;
  }

  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #ddd;
    float: left;
  }

  .header .title {
    font-size: 24px;
  }

  .content{
    width: 100%;
    min-height: 50px;
    float: left;
    overflow-y: hidden;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  mounted(){
  },
  data() {
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null
    }
  },
  components: {
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    retrieve() {
      let par = {
        condition: [{
          value: this.user.userID,
          clause: '=',
          column: 'merchant_id'
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('merchant_locations/retreive', par).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0) {
          this.data = response.data
        } else {
          this.data = null
        }
      })
    }
  }
}
</script>
