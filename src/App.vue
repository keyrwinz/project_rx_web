<template>
  <div id="app">
    <div v-bind:style="(globalVariables.showModal) ? 'overflow-y:hidden; height:'+deviceHeight+'px!important': ''">
      <div v-if="tokenData.token !== null && parseInt(user.userID) > 0 && tokenData.loading === false && user.type !== 'USER'">
       <system-header v-bind:sidebarFlag="menu" ref="header"></system-header>
       <!-- <system-sidebar v-bind:menuFlag="menu" @toggleSidebar="toggleSidebar"></system-sidebar> -->
       <div class="content-holder mx-auto container-fluid" :class="[{'login': tokenData.token !== null && parseInt(user.userID) > 0}]">
         <system-notification></system-notification>
          <transition >
            <router-view ></router-view>
          </transition>
       </div>
       <!-- <support-messenger></support-messenger> -->
       <!-- <system-footer></system-footer> -->
       <landing-footer></landing-footer>
       <guide></guide>
       <!-- <tutorial></tutorial> -->
      </div>
      <div v-else-if="tokenData.loading === true">
        <lazy-loading></lazy-loading>
      </div>
      <div v-else-if="tokenData.loading === false">
        <login-header></login-header>
        <system-content></system-content>
        <landing-footer></landing-footer>
      </div>
    </div>
    <!-- <system-footer></system-footer> -->
    <alert-modal></alert-modal>
    <system-loading></system-loading>
    <privacy-policy></privacy-policy>
    <terms-and-conditions></terms-and-conditions>
    <consent-modal></consent-modal>
  </div>
</template>
<style lang="scss">
@import "~assets/style/colors.scss";
.half-width{
  width: 50%
}
.push-half-right{
  margin-left: 50%
}
.nav a{
  font-size: 15px
}
.dropdown-menu li a{
  padding: 10px;
}
.container {
   min-height:100%;
   position:relative;
}
.content-holder{  
  min-height: 70.5vh;
  overflow: hidden;
  transition: all 1s ease 0s;
  z-index: 1;
}

.content-holder.login {
  margin-top: 50px;
}
@media (min-width: 1200px){
  .content-holder{
    width: 94%;
    margin-bottom: 1%;
    float: right; /*- changed float left to right -*/
  }

  .content-holder.login {
    margin-top: 60px;
  }
}

@media (min-width: 992px) and (max-width: 1199px){
  .content-holder{
    width: 71%;
    margin: 60px 0px 0px 0px;
    margin-right: 1%;
    float: right; /*- changed float from left to right -*/
  }
}

/*
  BACKGROUND
*/

.bg-primary{
  background: $primary !important; 
}

.bg-secondary{
  background: $primary !important; 
}

/*
  BTNS
*/
.btn-primary{
  background: $primary !important;
  border-color: $primary !important;
  height: 35px !important;
}

.btn-primary:hover{
  background: $darkPrimary !important;
  border-color: $darkPrimary !important;
}

.btn-primary:active{
  background: $darkPrimary !important;
  border-color: $darkPrimary !important;
}

.btn-secondary{
  background: $secondary !important;
  border-color: $secondary !important;
  height: 35px !important;
}

.btn-secondary:hover{
  background: $secondary !important;
  border-color: $secondary !important;
}

.btn-danger{
  background: $danger !important;
  height: 35px !important;
}

.btn-danger:hover{
  background: $danger !important;
  border-color: $danger !important;
}

.btn-warning{
  background: $warning !important;
  height: 35px !important;
}

/* TEXT */

.text-primary{
  color: $primary !important;
}

.text-white{
  color: $white !important;
}

.text-gray{
  color: #555 !important;
}

.text-yellow{
  color: $warning !important;
}

/* 
  
  OTHERS
  
*/
.page-link{
  color: $primary !important;
  background: inherit;
}
.empty-table:hover{
  cursor: pointer;
  color: white !important;
  background: $primary !important;
}
.page-link:hover{
  cursor: pointer;
  background: $primary !important;
  color: white !important;
}

.action-link:hover{
  color: $primary !important;
  cursor: pointer;
}
.text-underline:hover{
  cursor: pointer;
  text-decoration: underline;
}
.breadcrumb{
  color: $primary;
  background: inherit !important;
  border: none !important;
}
.breadcrumb:hover{
  cursor: pointer;
  text-decoration: underline; 
}
td i{
  font-size: 16px !important;
  padding-right: 10px;
}
td i:hover{
  cursor: pointer;
  color: $primary !important; 
}

.table tbody td{
  height: 35px !important;
  padding: .50rem !important;
}

body .modal-backdrop {
  pointer-events: none;
  background-color: transparent;
}

.modal {
  background: rgba(0,0,0,0.5);
}

.shadow-none {
  box-shadow: none!important;
}

.shadow-sm {
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}

.shadow {
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
}

.link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

.link:hover {
  color: #0056b3;
  text-decoration: underline;
  cursor: pointer;
}

.link.text-primary {
  color: $primary !important;
}

.link.text-primary:hover {
  color: $darkPrimary !important;
}

.rounded-pill {
  border-radius: 50rem!important;
}

.btn-outline-primary {
  border-color: $primary !important;
  color: $primary !important;
}

.btn-outline-primary:hover {
  background: $primary !important;
  color: white !important;
}

.btn.btn-outline-primary:focus,
.btn.btn-primary:focus {
  box-shadow: 0 0 0 3px #{$primary}80;
}

.border-bottom {
  border-bottom: 1px solid #dee2e6!important;
}

.border-top {
  border-top: 1px solid #dee2e6!important;
}

.border-right {
  border-right: 1px solid #dee2e6!important;
}

.border-left {
  border-left: 1px solid #dee2e6!important;
}
</style>
<script>
import ROUTER from './router'
import AUTH from './services/auth'
import global from './helpers/global'
export default {
  name: 'app',
  mounted(){
  },
  created(){
    // this.validate()
  },
  data(){
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      currentRoute: ROUTER.currentRoute.name,
      deviceHeight: document.documentElement.clientHeight,
      appGlobal: {
        showModal: false
      },
      menu: true,
      globalVariables: global
    }
  },
  methods: {
    logOut(){
      AUTH.deaunthenticate()
    },
    toggleSidebar(newFlag) {
      this.menu = newFlag
      this.$refs['header'].sidebar = newFlag
    },
    validate(){
      if(this.tokenData.verifyingToken === false && this.tokenData.token !== null){
        ROUTER.push('/dashboard')
      }else{
        ROUTER.push('/login')
      }
    }
  },
  components: {
    'login-header': () => import('modules/home/Landing/Header.vue'),
    'system-header': () => import('modules/frame/Header.vue'),
    'system-sidebar': () => import('modules/frame/Sidebar.vue'),
    'system-content': () => import('modules/frame/Content.vue'),
    'system-footer': () => import('components/increment/generic/frame/Footer.vue'),
    'system-loading': () => import('components/loader/Loading.vue'),
    'landing-footer': () => import('modules/home/Landing/Footer.vue'),
    'privacy-policy': () => import('modules/docs/PrivacyPolicy.vue'),
    'consent-modal': () => import('modules/docs/Consent.vue'),
    'alert-modal': () => import('modules/docs/Alert.vue'),
    'terms-and-conditions': () => import('modules/docs/TermsAndConditions.vue'),
    'guide': () => import('modules/guide/Guide.vue'),
    'support-messenger': () => import('components/increment/support/Support.vue'),
    'tutorial': () => import('components/increment/generic/tutorial/Tutorial.vue'),
    'system-notification': require('components/increment/generic/system/Notifications.vue'),
    'lazy-loading': () => import('components/increment/generic/lazy/Loading.vue')
  }
}
</script>
