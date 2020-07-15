<template>
  <div style="margin-bottom: 200px;">
    <h1>Welcome to dashboard</h1>
    <cards></cards>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important;
}

.text-primary {
  color: $primary !important;
}

.text-warning {
  color: $warning !important;
}

.text-black {
  color: #000 !important;
}
.text-success {
  color: $success !important;
}

.half-rule {
  margin-left: 0;
  text-align: left;
  width: 50%;
}
</style>
<script>
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user
    }
  },
  props: {
  },
  components: {
    'cards': require('modules/ecommerce/marketplace/Cards.vue')
  },
  methods: {
  }
}
</script>
