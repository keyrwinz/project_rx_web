<template>
	<div class="body">
		<landing-banner></landing-banner>
    <landing-categories></landing-categories>
    <landing-rider></landing-rider>
	</div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'landing-categories': require('modules/home/Landing/Categories.vue'),
    'landing-rider': require('modules/home/Landing/Rider.vue')
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
      },
      data: [{
        title: 'This is a test',
        qty: 1,
        notes: null,
        status: 'pending',
        id: 1
      }],
      checkout: {
        id: 1
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
