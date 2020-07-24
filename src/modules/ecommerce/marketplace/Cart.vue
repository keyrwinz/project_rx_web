<template>
  <div class="col-auto h-100" type="button" data-toggle="modal" data-target="#cart">
    <button class="btn bg-transparent text-white p-0 border-0 h-100"><i class="fa fa-shopping-cart"></i></button>

    <div class="modal fade text-dark" id="cart" tabindex="-1" role="dialog" aria-labelledby="cartHeader" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="cartHeader">Your Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            Items here yeet
          </div>

          <button type="button" class="btn btn-primary btn-lg btn-block checkout text-center">Check Out</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "~assets/style/colors.scss";

  button:focus {
    outline: none;
    box-shadow: none;
  }

  .checkout {
    margin-top: 3rem;
    line-height: 50px;
    height: unset !important;
    font-weight: bold;
    border-radius: 0px 0px .2rem .2rem;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      common: COMMON,
      config: CONFIG
    }
  },
  methods: {
  }
}
</script>
