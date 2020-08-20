<template>
  <div class="col-sm-12 col-md-6 col-lg-4 mx-auto holder">
    <div class="login-wrapper">
      <div class="login-header" style="margin-top: 75px;">
        <img :src="require('src/assets/img/logo.png')" v-on:click="redirect('/')">
      </div>
      <span style="width:100%;float:left;text-align:center;font-size:20px;margin-bottom:20px;">
        Login to <b class="text-primary">{{common.APP_NAME}}</b>
      </span>
      <div class="login-message-holder login-spacer" v-if="errorMessage !== null">
        <span class="text-danger"><b>Oops!</b> {{errorMessage}}</span>
      </div>
      <div>
        <div class="input-group login-spacer">
          <div class="input-group-addon" id="addon-1"><i class="fa fa-user"></i></div>
          <input type="text" class="form-control form-control-login" placeholder="Username or Email" aria-describedby="addon-1" v-model="username">
        </div>
        <div class="input-group login-spacer">
          <span class="input-group-addon" id="addon-2"><i class="fa fa-key"></i></span>
          <input :type="showPassword ? 'text' : 'password'" class="form-control form-control-login" placeholder="********" aria-describedby="addon-2" v-model="password" @keyup.enter="logIn()">
          <button type="button" class="input-group-addon" id="showPassword" @click="showPassword = !showPassword"><i :class="['fa', {'fa-eye': !showPassword}, {'fa-eye-slash': showPassword}]"></i></button>
        </div>
        <button class="btn btn-primary btn-block login-spacer" v-on:click="logIn()">Login</button>
        <button class="btn btn-warning btn-block login-spacer" v-on:click="redirect('/request_reset_password')">Forgot your Password?</button>
        <!-- <button class="btn btnFB btn-block login-spacer mt-3" @click="logInWithFacebook"> Login with Facebook</button> -->
        <br>
        <div class="container-fluid separator">
            or
        </div>
        <br>
        <button class="btn btn-secondary btn-block login-spacer" v-on:click="redirect('/signup')">Create Account Now!</button>

<!--         <button class="btn btn-secondary btn-block login-spacer" v-on:click="redirect('/paymentConfirmation/kennettecanales@gmail.com/BWGFK8XY74RM1C2LZVEITPAJQ9D65N03/U4381TYWQKLIGS79DJNME5AVBRZPFH2O')">Payment Confirmation</button> -->
        <!-- <button class="btn btn-secondary btn-block login-spacer" v-on:click="redirect('/login_verification/magalso12/50DBXMFRGU6WI8VC3NA1OHLP7YTE92JS')">Verification</button> -->
      </div>
    </div>
  </div>
</template>
<style>
  .abcRioButton {
    width: 100% !important;
    border-radius: 5px;
}
</style>
<style scoped lang="scss">
@import "~assets/style/colors.scss";

#showPassword {
  width: 10% !important;
  border-right: 1px solid rgba(0,0,0,.15);
}

#showPassword:focus {
  outline: none;
}

.btnFB{
  background-color: $skyBlue
}
.holder{
  margin-top: 25px;
}
.bg-primary{
  background: $primary !important; 
}

.login-wrapper{
  width: 80%;
  margin: 0 10% 50px 10%;
}

.login-header{
  height: 100px;
  color: #006600;
  width: 100%;
  float: left;
  text-align: center;
}

.login-header img{
  height: 100px !important;
  width: auto !important;
}

.login-header img:hover{
  cursor: pointer;
}

.login-message-holder{
  min-height: 30px;
  font-size: 12px;
  float: left;
  overflow: hidden;
}

.login-spacer{
  margin-bottom: 10px;
}/*-- login-spacer --*/

.forgot-password a{
  color: #006600 !important;
}
.forgot-password a:hover{
  cursor: pointer !important;
  text-decoration: underline !important;
  color: #009900 !important;
}

.btn{
  height: 50px !important;
}

.input-group-addon{
  width: 15% !important;
  text-align: center !important;
  padding: 0px !important;
  display: block !important;
  line-height: 43px !important;
}

.form-control-login{
  height: 45px !important;
}

/*    Line with text on top  */
.separator>*{
  display: inline-block;
  vertical-align: middle;
}

.separator {
    text-align: center;
    border: 0;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.separator:before, .separator:after {
    content: "";
    height: 1px;
    width: 50%;
    background-color: #ccc;
    margin: 0 5px 0 5px;
    display: inline-block;
    vertical-align: middle;
}

.separator:before {
    margin-left: -100%;
}

.separator:after {
    margin-right: -100%;
}

@media (max-width: 992px){
  .login-wrapper{
    width: 96%;
    margin: 0 2% 0 2%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import GoogleLogin from 'vue-google-login'
export default {
  name: 'facebookLogin',
  mounted(){
  },
  data(){
    return {
      username: null,
      password: null,
      errorMessage: null,
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      showPassword: false,
      otpCode: null,
      otpErrorCode: null,
      common: COMMON,
      loginParam: {
        client_id: '110121744042-m2q8b6gjnor8q8njmu1dkgtsieek9as2.apps.googleusercontent.com'
      },
      renderParams: {
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    logIn(){
      if(this.username !== null && this.username !== '' && this.password !== null && this.password !== ''){
        $('#loading').css({'display': 'block'})
        AUTH.authenticate(this.username, this.password, (response) => {
          this.errorMessage = null
          $('#loading').css({'display': 'none'})
        }, (response, status) => {
          $('#loading').css({'display': 'none'})
          this.errorMessage = (status === 401) ? 'Username and Password did not match.' : 'Cannot log in? Contact us through email: ' + this.common.APP_EMAIL
        })
      }else{
        this.errorMessage = 'Please fill up all the required fields.'
      }
    },
    redirect(parameter){
      ROUTER.push(parameter)
    },
    request(parameter){
      this.APIRequest(parameter, {}).then(response => {
      })
    }
  }
}
</script>
