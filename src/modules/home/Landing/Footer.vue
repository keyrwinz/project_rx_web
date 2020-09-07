<template>
  <footer>
    <div class="footer">
      <ul class="footer-widget">
        <li class="title"><a><b>{{common.APP_NAME}}</b></a></li>
      </ul>
    </div>
    <div class="footer">
      <ul class="footer-widget contact-us"> 
        <li class="title"><b>Company</b></li>
        <li><a v-on:click="redirect('/')">Home</a></li>
        <li><a v-on:click="redirect('/')">About Us</a></li>
        <li><a v-on:click="redirect('/')">Contact Us</a></li>
      </ul>
      <ul class="footer-widget">
        <li class="title"><b>Privacy and Terms</b></li>
        <li><a @click="openModal('#termsAndConditionsModal')">Terms & Conditions</a></li>
        <li><a @click="openModal('#privacyModal')">Privacy Policy</a></li>
      </ul>
       <ul class="footer-widget">
        <li class="title"><b>Resources</b></li>
        <li class="link"><a @click="openModal('#guideModal')">Guide</a></li>
      </ul>
    </div>
    <div class="footer">
      <ul class="footer-widget community" >
        <div>
          <span class="link">
            <a target="_BLANK" class="text-white" :href="'https://www.facebook.com/' + common.socialMedia.facebook" ><i class="fab fa-facebook"></i></a>
          </span>
          <span class="link">
            <a target="_BLANK" class="text-white" :href="'https://www.facebook.com/' + common.socialMedia.facebook" ><i class="fab fa-twitter"></i></a>
          </span>
          <span class="link">
            <a target="_BLANK" class="text-white" :href="'https://www.facebook.com/' + common.socialMedia.facebook" ><i class="fab fa-youtube"></i></a>
          </span>
          <span class="link">
            <a target="_BLANK" class="text-white" :href="'https://www.facebook.com/' + common.socialMedia.facebook" ><i class="fab fa-linkedin-in"></i></a>
          </span>
          <span class="link">
            <a target="_BLANK" class="text-white" :href="'https://www.facebook.com/' + common.socialMedia.facebook" ><i class="fab fa-instagram"></i></a>
          </span>
        </div>
        
      </ul>
      <ul class="footer-widget community" style="cursor:default">
        <div>
          <span>
            <i class="fas fa-map"></i><span style="padding-left:5px;"> USC-TC, Talamban, Cebu City</span>
          </span>
        </div>
        
      </ul>
      <ul class="footer-widget community" style="padding-left:10px;padding-right:10px;" >
        <div>
          <span class="link">
            <a class="" :href="common.appUrl.android" v-if="common.appUrl.android !== null">
              <img style="height:40px;width:45%;border:.5px solid grey;border-radius:5px" alt='Get it on Google Play' :src="require('assets/img/playstore.png')"/>
            </a>
          </span>
          <span class="link">
            <a style="margin-left: 10px;" :href="common.appUrl.ios" v-if="common.appUrl.ios !== null" >
              <img style="height:40px;width:45%;border:.5px solid grey;border-radius:5px;" alt='Get it on App Store' :src="require('assets/img/appstore.png')"/>
            </a>
          </span>
        </div>
      </ul>
        <span class="copyright">
        <label>Copyright @{{common.COPYRIGHT}}. All rights reserved.</label>
      </span>
      </div>
  </footer>
</template>
<style scoped>
footer {
  width:100%;
  min-height: 200px;
  float: left;
  overflow-y: hidden;
  background: #000;
}
.footer{
  width: 80%;
  float: left;
  margin-left: 10%; 
  margin-right: 10%;
  margin-top: 50px;
  overflow-y: hidden;
}

.footer-widget{
  width:32%;
  min-height: 50px;
  float: left;
  list-style: none;
  padding: 0px;
  margin-bottom: 0px;
  position:relative;
}


.footer-widget li{
  list-style: none;
  padding: 5px 10px 10px 10px;
  float: left;
  width: 100%;
  color: #fff !important;
}
.footer-title h4{
  margin-top: 60px;
  color: white;
}
.footer-widget, .footer-widget li a{
  color: #fff !important;
  cursor: pointer;
}
.footer-widget .title{
  color: #fff;
  margin-bottom: 20px;
}

.footer-widget li a:hover{
  color: #ff8e31 !important;
}
footer-widget .title:hover{
  cursor: default;
  text-decoration: none;
}
.community div{
  position: absolute;
  bottom:0px;
}
.community .links{
  width: 100%;
  float: left;
}
.community .link i{
  font-size: 20 px;
  padding: 0 10px 0 10px;
  float: left;
  width: 20%;
}
.community .link i:hover{
  color: #fff;
  cursor: pointer;
}
.text-gray{
  color: #fff;
}

.contact-us li i{
  padding-right: 10px;
}

.contact-us li .fa-phone{
  padding-right: 9px;
}

.contact-us li .fa-mobile-alt{
  padding-right: 12px;
}

.copyright{
  width: 100%;
  float: left;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
  text-align: center;
  margin-top: 45px;
  margin-bottom: 20     px;
  color: #fff !important;
}
@media screen and (max-width: 992px){
  .footer-widget, .footer-title{
    width: 100%;
    text-align: center;
    margin-right: 0%;
    padding: 0px;
  }
  .community .title{
    text-align: center;
  }

  .community i{
    width: 20%;
  }
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
    return{
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      account: [],
      config: CONFIG,
      host: null,
      common: COMMON
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    openModal(id){
      $(id).modal('show')
    }
  }
}
</script>
