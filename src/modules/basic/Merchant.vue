<template>
  <div class="merchant-holder" v-if="data !== null">
    <span class="header">{{title}}</span>
    <span class="content">
      <span class="error text-danger" v-if="errorMessage !== null">
        <b>Oops!</b> {{errorMessage}}
      </span>
      <span class="error text-success" v-if="successMessage !== null">
        {{successMessage}}
      </span>
      <span class="inputs">

        <div class="form-group">
          <label for="address">Business name <label class="text-danger">*</label></label>
          <input type="text" class="form-control" placeholder="Business Name" v-model="data.name" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>

        <div class="form-group" style="margin-top: 25px;" v-if="allowed.indexOf('email') > -1">
          <label for="address">Business email address<label class="text-danger">*</label></label>
          <input type="text" class="form-control" placeholder="Business email address" v-model="data.email" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>

        <div class="form-group" style="margin-top: 25px;" v-if="allowed.indexOf('code') > -1">
          <label for="address">ABN<label class="text-danger">*</label></label>
          <input type="text" class="form-control" placeholder="Business code" v-model="data.business_code" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>

        <div class="form-group" style="margin-top: 25px;" v-if="allowed.indexOf('address') > -1">
          <label for="address">Business address <label class="text-danger">*</label></label>
          <input type="text" class="form-control" placeholder="Business Address" v-model="data.address" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>

        <div class="form-group" style="margin-top: 25px;" v-if="allowed.indexOf('prefix') > -1">
          <label for="address">Prefix</label>
          <input type="text" class="form-control" placeholder="Invoice Prefix eq. IDF" v-model="data.prefix" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>

        <div class="form-group" style="margin-top: 25px;" v-if="allowed.indexOf('website') > -1">
          <label for="address">Website</label>
          <input type="text" class="form-control" placeholder="Company website url" v-model="data.website" :disabled="parseInt(data.account_id) !== parseInt(user.userID)">
        </div>
        
        <button class="btn btn-primary" style="margin-bottom: 25px;" @click="update()" v-if="parseInt(data.account_id) === parseInt(user.userID)">Update</button>
      </span>
      <span class="sidebar" v-if="createFlag === false">
        <span class="sidebar-header" style="margin-top: 25px;">Business Logo</span>
        <span class="image" v-if="data.logo !== null">
          <img :src="config.BACKEND_URL + data.logo" height="auto" width="100%" >
        </span>
        <span class="image" v-else>
          <i class="fa fa-image" ></i>
        </span>
        <span style="width: 100%; float: left; text-align: center;">
          <label v-if="data.status === 'not_verified'" class="text-grey"><i>Not verified</i></label>
          <label v-if="data.status === 'verified'" class="text-primary"><i>Verified</i></label>
        </span>
        <button class="btn btn-primary custom-block" style="margin-top: 5px;" @click="showImages()" v-if="parseInt(data.account_id) === parseInt(user.userID)">Select from images
        </button>
      </span>
    </span>
    <browse-images-modal :object="photoObject"></browse-images-modal>
  </div>
</template>
<style scoped>
.merchant-holder{
  width: 95%;
  float: left;
  margin-left: 5%;
  margin-bottom: 200px;
}
.header{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  border-bottom: solid 1px #ddd;
  float: left;
}
.content{
  width: 100%;
  min-height: 50px;
  float: left;
  overflow-y: hidden;
}
.content .error{
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
}
.inputs{
  width: 65%;
  float: left;
  margin-right: 5%;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar{
  width: 30%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar-header{
  height: 40px;
  line-height: 40px;
  width: 100%;
  float: left;
}
.sidebar .image{
  width: 100%;
  float: left;
  min-height: 200px;
  overflow-y: hidden;
  text-align: center;
}
.image i{
  font-size: 150px;
  line-height: 200px;
}
.image img{
  border-radius: 5px;
}
.custom-block{
  width: 100%;
  float: left;
}
.custom-block input{
  display: none;
}
.row{
  margin: 0px !important;
}
.row .left{
  padding-left: 0px !important;
}
.row .right{
  padding-right: 0px !important;
}
@media screen and (max-width: 992px){
  .holder{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .sidebar, .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
  .row .form-group{
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null,
      errorMessage: null,
      successMessage: null,
      newData: {
        account_id: AUTH.user.userID,
        prefix: null,
        logo: null,
        email: null,
        address: null,
        name: null,
        website: null
      },
      newProfile: {
        id: null,
        account_id: AUTH.user.userID,
        url: null
      },
      createFlag: false,
      photoObject: {
        url: null
      }
    }
  },
  props: ['title', 'allowed'],
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue')
  },
  methods: {
    retrieve(){
      if(AUTH.user.subAccount !== null && AUTH.user.subAccount.merchant !== null){
        $('#loading').css({display: 'none'})
        this.data = AUTH.user.subAccount.merchant
        return
      }
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      this.APIRequest('merchants/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data[0]
          this.createFlag = false
        }else{
          this.createFlag = true
          this.data = this.newData
        }
      })
    },
    update(url){
      if(this.data.email !== null && AUTH.validateEmail(this.data.email) === false){
        this.errorMessage = 'Invalid email address.'
        return
      }
      if(this.createFlag === false){
        this.data.logo = url
        this.newProfile.url = url
        let path
        if(this.user.profile === null) {
          path = 'create'
        } else {
          path = 'update'
          this.newProfile.id = this.user.profile.id
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('merchants/update', this.data).then(response => {
          if(response.data === true){
            this.APIRequest(`account_profiles/${path}`, this.newProfile).then(res => {
              $('#loading').css({display: 'block'})
              if((path === 'update' && res.data === true) || (path === 'create' && res.data > 0)) {
                this.retrieve()
                this.successMessage = 'Successfully Updated!'
                this.errorMessage = null
                AUTH.checkAuthentication()
              } else {
                this.successMessage = null
                this.errorMessage = 'Unable to Update! Please contact the administrator.'
              }
            })
          }else{
            $('#loading').css({display: 'block'})
            this.successMessage = null
            this.errorMessage = 'Unable to Update! Please contact the administrator.'
          }
        })
      }else{
        this.create(url)
      }
    },
    create(url){
      this.data.logo = url
      if(this.data.email !== null && AUTH.validateEmail(this.data.email) === false){
        this.errorMessage = 'Invalid email address.'
        return
      }
      this.APIRequest('merchants/create', this.data).then(response => {
        if(response.data > 0){
          this.retrieve()
          this.successMessage = 'Successfully Updated!'
          this.errorMessage = null
          AUTH.checkAuthentication(null, true)
        }else{
          this.successMessage = null
          this.errorMessage = 'Unable to Update! Please contact the administrator.'
        }
      })
    },
    updatePhoto(object){
      this.data.logo = object.url
      this.update()
      this.hideImages()
    },
    createPhoto(object){
      this.data.logo = object.url
      this.update()
      this.hideImages()
    },
    showImages(){
      $('#browseImagesModal').modal('show')
    },
    manageImageUrl(url){
      this.update(url)
    }
  }
}
</script>
