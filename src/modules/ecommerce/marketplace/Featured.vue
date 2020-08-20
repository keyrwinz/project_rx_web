<template>
  <div style="margin-bottom: 200px;">
    <cards  :listType="'featured'"
            :header="'Express your love with Runway Express'"
            :subheader="'Refer 5 friends and get a ₱100 coupon on us!'"></cards>
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
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
export default{
  mounted(){
    if(this.user.type === 'USER') {
      ROUTER.push('/welcome')
    }
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
