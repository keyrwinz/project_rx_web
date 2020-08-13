<template>
	<div class="body">
		<landing-banner></landing-banner>
    <test-banner :data="data" :checkout="checkout"></test-banner>
    <div>
      <button class="btn btn-primary" @click="showModal()" style="margin-top: 100px;">
        Show products
      </button>
    </div>
	</div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'test-banner': require('components/increment/imarketvue/delivery/ViewProducts.vue')
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
        status: 'pending'
      }],
      checkout: {
        id: 1
      }
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showModal(){
      $('#viewProductOnModal').modal('show')
    }
  }
}
</script>
<style scoped>
.body{
	margin: 0px;
}
</style>
