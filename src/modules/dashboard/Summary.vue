<template>
  <div v-if="data !== null">
    <label class="text-danger" v-if="data.positive > 0">
      <i class="fas fa-square" style="margin-right: 5px;"></i>
      {{data.positive}} Positive
    </label>

    <label class="text-warning" v-if="data.pum > 0">
      <i class="fas fa-square" style="margin-right: 5px;"></i>
      {{data.pum}} Person under monitoring(PUM)
    </label>

    <label class="text-warning" v-if="data.pui > 0">
      <i class="fas fa-square" style="margin-right: 5px;"></i>
      {{data.pui}} Person under investigation(PUI)
    </label>

    <label class="text-primary" v-if="data.recovered > 0">
      <i class="fas fa-square" style="margin-right: 5px;"></i>
      {{data.recovered}} Recoveries
    </label>

    <label v-if="data.death > 0">
      <i class="fas fa-square" style="margin-right: 5px;"></i>
      {{data.death}} Deaths
    </label>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.text-primary{
  color: $primary !important;
}

.text-danger{
  color: $danger !important;
}

.text-warning{
  color: $warning !important;
}
label{
  font-size: 16px;
  width: 100%;
  float: left;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import QrcodeVue from 'qrcode.vue'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      common: COMMON,
      user: AUTH.user,
      data: null
    }
  },
  components: {
    QrcodeVue
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(){
      this.APIRequest('patients/summary', {}).then(response => {
        this.data = response.data
      })
    }
  }
}
</script>
