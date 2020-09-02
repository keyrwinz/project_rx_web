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

        <div class="form-group business-schedule">
          <label for="address">Business Schedule</label>
          <i :class="['fa fa-edit', {'text-warning': isEditingSchedule}]" @click="isEditingSchedule = !isEditingSchedule" style="font-size: 20px" />
          <div v-if="errorSchedMessage !== null || successSchedMessage !== null">
            <span class="error text-danger" v-if="errorSchedMessage !== null">
              <b>Oops!</b> {{errorSchedMessage}}
            </span>
            <span class="error text-success" v-if="successSchedMessage !== null">
              {{successSchedMessage}}
            </span>
          </div>
          <div class="ml-1">
            <button
              v-for="(day, idx) in WEEKDAYS" :key="idx"
              :class="['btn my-2 mr-1', { 'btn-success': daysSelected.includes(day) }, { 'btn-disabled': !isEditingSchedule }]"
              @click="addDay(day)" 
            >
              {{ day }}
            </button>
          </div>
          <div class="my-2">
            <div>
              <input v-model="scheduleTypeSelected" type="radio" id="time24" name="time-schedule" value="open" :disabled="!isEditingSchedule">
              <label for="time24">Open 24 hours</label>
            </div>
            <div>
              <input v-model="scheduleTypeSelected" type="radio" id="time" name="time-schedule" value="time-range" :disabled="!isEditingSchedule">
              <label for="time">Time range</label>
              <div class="ml-1">
                <!-- start -->
                <span class="mx-1" style="font-size: 0.8rem">
                  Open time
                </span>
                <date-picker
                  v-model="startTime"
                  :minute-step="30"
                  format="hh:mm a"
                  value-type="format"
                  type="time"
                  placeholder="hh:mm a"
                  :disabled="scheduleTypeSelected !== 'time-range' || !isEditingSchedule"
                  :editable="false"
                ></date-picker>
                <!-- end -->
                <span class="mx-1" style="font-size: 0.8rem">
                  End time
                </span>
                <date-picker
                  v-model="endTime"
                  :minute-step="30"
                  format="hh:mm a"
                  value-type="format"
                  type="time"
                  placeholder="hh:mm a"
                  :disabled="scheduleTypeSelected !== 'time-range' || !isEditingSchedule"
                  :editable="false"
                ></date-picker>
              </div>
            </div>
          </div>
          <button v-if="isEditingSchedule" class="btn btn-primary my-2" @click="updateSched()">
            Update Schedule
          </button>
        </div>
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
.business-schedule {
  margin-top: 25px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
}
.btn:hover, .fa {
  cursor: pointer;
}
.btn-disabled:hover {
  cursor: not-allowed;
}
</style>
<script>
import DatePicker from 'vue2-datepicker'
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
import { WEEKDAYS } from 'src/helpers/date'
import 'vue2-datepicker/index.css'
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
      errorSchedMessage: null,
      successSchedMessage: null,
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
      },
      WEEKDAYS,
      isEditingSchedule: false,
      scheduleTypeSelected: 'open',
      daysSelected: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      startTime: null,
      endTime: null
    }
  },
  props: ['title', 'allowed'],
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    DatePicker
  },
  methods: {
    retrieve(){
      if(AUTH.user.subAccount !== null && AUTH.user.subAccount.merchant !== null){
        $('#loading').css({display: 'none'})
        this.data = AUTH.user.subAccount.merchant
        const schedule = JSON.parse(AUTH.user.subAccount.merchant.schedule)
        this.scheduleTypeSelected = schedule.type
        this.daysSelected = schedule.days
        this.startTime = schedule.startTime
        this.endTime = schedule.endTime
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
          if (response.data[0].schedule != null) {
            const schedule = JSON.parse(response.data[0].schedule)
            this.scheduleTypeSelected = schedule.type
            this.daysSelected = schedule.days
            this.startTime = schedule.startTime
            this.endTime = schedule.endTime
          }
        }else{
          this.createFlag = true
          this.data = this.newData
        }
      })
    },
    update(url = null){
      if(this.data.email !== null && AUTH.validateEmail(this.data.email) === false){
        this.errorMessage = 'Invalid email address.'
        return
      }
      if(this.data.name === '' || this.data.name === null){
        this.errorMessage = 'Invalid business name.'
        return
      }
      if(this.createFlag === false){
        if(url) {
          this.data.logo = url
          this.newProfile.url = url
        } else {
          this.newProfile.url = this.data.logo
        }
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
                // AUTH.checkAuthentication(null, true)
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
          // AUTH.checkAuthentication(null, true)
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
    },
    addDay(day){
      if (this.isEditingSchedule === false) return

      const indexOfDay = this.daysSelected.indexOf(day)
      if (indexOfDay > -1) {
        this.daysSelected.splice(indexOfDay, 1)
      } else {
        this.daysSelected.push(day)
      }
    },
    updateSched() {
      this.errorSchedMessage = null
      this.successSchedMessage = null

      const scheduleTypeSelected = this.scheduleTypeSelected
      const daysSelected = this.daysSelected
      const startTime = this.startTime
      const endTime = this.endTime

      if (daysSelected.length === 0) {
        this.errorSchedMessage = 'Schedule days are required'
        return
      }

      if (scheduleTypeSelected === 'time-range' && (startTime === null || endTime === null)) {
        this.errorSchedMessage = 'Time range is required'
        return
      }

      const updatedSchedule = JSON.stringify({
        type: scheduleTypeSelected,
        days: daysSelected,
        startTime,
        endTime
      })

      this.APIRequest('merchants/update', {
        id: this.data.id,
        schedule: updatedSchedule
      }).then(response => {
        if (response.data) {
          this.successSchedMessage = 'Updated business schedule successfully!'
        }
      }).catch(() => {
        this.errorSchedMessage = 'Unable to Update! Please contact the administrator.'
      })
    }
  }
}
</script>
