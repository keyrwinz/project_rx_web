<template>
  <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-white">
          <h5 class="modal-title text-danger" id="exampleModalLabel">Scanned User Alert</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="stop()">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="text-danger">
            New scanned user was exposed!
          </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#alertModal" @click="stop()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background-color: $primary !important;
}
.guide-holder{
  margin-top:22px;
  width:90%;
  float: left;
  margin-left:5%;
  margin-right:5%;
}
.first-ul{
  padding: 0px;
  list-style: none;
}
ul li{
  text-align: justify;
  font-size: 15px;
  color: grey;
  padding-top: 10px;
}
.second-ul{
  padding-left: 10px;
  list-style: inside;
}
</style>
<script>
  import ROUTER from 'src/router'
  import Vue from 'vue'
  import AUTH from 'src/services/auth'
  import COMMON from 'src/common.js'
  export default{
    data(){
      return {
        user: AUTH.user,
        common: COMMON
      }
    },
    props: {
    },
    methods: {
      redirect(parameter){
        ROUTER.push(parameter)
      },
      stop(){
        $('#alertModal').modal('hide')
        AUTH.playNotificationSound(false)
      }
    }
  }
</script>
