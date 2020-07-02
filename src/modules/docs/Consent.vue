<template>
  <div class="modal fade" id="consentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="user.userID > 0">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-light" id="exampleModalLabel">Consent Request</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="guide-holder">
            <p>
              Hi {{user.username}}!
            </p>
            <p>
              Welcome to {{common.APP_NAME}}. We would like you to know that we need to collect these data from you to help us compare and trace to the affected individual from Covid-19.
            </p>
            <p>(1) Personal information such as: username, e-mail address, password, first name, middle name, last name, birth date, address and gender</p>
            <p>(2) Your visited locations or places which includes route, locality, coordinates, country, date and time</p>
            <p>(3) Your used transportations which includes the information of the vehicle, the date and time</p>
            <p>(4) Your reported symptoms</p>
            <p>(5) Your recorded temperature</p>
            <p>
              By clicking the accept button, you fully give us a consent to use these informations.
            </p>
            <p>
              Thank you and stay safe.
            </p>
            <p>
              Regards,
            </p>
            <br>
            <p>
              BirdsEye Team
            </p>
            <br>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#consentModal" @click="accept()">Accept</button>
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
    methods: {
      hide(){
        $('#consentModal').modal('hide')
      },
      accept(){
        let parameter = {
          account_id: this.user.userID
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('consents/create', parameter).then(response => {
          $('#loading').css({display: 'none'})
          $('#consentModal').modal('hide')
          this.summary = response.data
        })
      }
    }
  }
</script>
