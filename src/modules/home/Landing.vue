<template>
	<div class="body">
    <!-- <google-places-auto-complete :property="property"></google-places-auto-complete> -->
    <!-- <landing-search></landing-search> -->
		<landing-banner></landing-banner>
    <landing-features></landing-features>
    <!-- <landing-contributors></landing-contributors> -->
    <landing-donations></landing-donations>
    <landing-partners></landing-partners>
	</div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  components: {
    'landing-search': require('modules/home/Landing/Search.vue'),
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'landing-features': require('modules/home/Landing/Features.vue'),
    'landing-donations': require('modules/home/Landing/Donations.vue'),
    'landing-contributors': require('modules/home/Landing/Contributors.vue'),
    'landing-partners': require('modules/home/Landing/Partners.vue'),
    'google-places-auto-complete': require('components/increment/generic/location/GooglePlacesAutoComplete.vue')
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
