<template>
  <div class="modal fade" id="confirmedRiderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Rider Confirmation</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5 class="text-center">Delivery Confirmed!</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="cont()">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
  .bg-primary{
    background: $primary !important;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
export default {
  mounted(){
    this.showModal()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      currency: CURRENCY
    }
  },
  methods: {
    hideModal(){
      $('#confirmedRiderModal').modal('hide')
    },
    showModal(){
      $('#confirmedRiderModal').modal('show')
    },
    cont(){
      this.$emit('updateRow', {})
    }
  }
}
</script>
