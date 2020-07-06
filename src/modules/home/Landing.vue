<template>
	<div class="body">
		<landing-banner></landing-banner>
	</div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue')
  },
  mounted(){
  },
  data(){
    return {
      property: {
        style: {
          height: '45px !important'
        },
        GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
        results: {
          style: {
          }
        }
      }
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
<style scoped>
.body{
	margin: 0px;
}
</style>
