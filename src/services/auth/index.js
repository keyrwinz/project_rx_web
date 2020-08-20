// src/auth/index.js
import {router} from 'src/router/index'
import ROUTER from 'src/router'
import {Howl} from 'howler'
import Vue from 'vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Config from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  user: {
    userID: 0,
    username: '',
    code: null,
    email: null,
    type: null,
    status: null,
    location: null,
    profile: null,
    amount: null,
    subAccount: null,
    notifications: {
      data: null,
      current: null,
      prevCurrent: null
    },
    notifSetting: null,
    messages: {
      data: null,
      totalUnreadMessages: 0
    },
    orders: [],
    riders: [],
    ledger: {
      amount: 0,
      currency: 'PHP'
    }
  },
  messenger: {
    messages: [],
    badge: 0,
    messengerGroupId: null,
    group: null
  },
  support: {
    messages: null,
    badge: 0,
    messengerGroupId: null
  },
  notifTimer: {
    timer: null,
    speed: 1000
  },
  tokenData: {
    token: null,
    tokenTimer: false,
    verifyingToken: false,
    loading: false
  },
  otpDataHolder: {
    userInfo: null,
    data: null
  },
  google: {
    code: null,
    scope: null
  },
  echo: null,
  currentPath: false,
  setUser(userID, username, email, type, status, profile, notifSetting, subAccount, code, location, flag){
    if(userID === null){
      username = null
      email = null
      type = null
      status = null
      profile = null
      notifSetting = null
      subAccount = null
      code = null
      location = null
    } else {
      this.user.userID = userID * 1
      this.user.username = username
      this.user.email = email
      this.user.type = type
      this.user.status = status
      this.user.profile = profile
      this.user.notifSetting = notifSetting
      this.user.subAccount = subAccount
      this.user.code = code
      this.user.location = location
      localStorage.setItem('account_id', this.user.userID)
      localStorage.setItem('account/' + code, JSON.stringify(this.user))
      if(flag){
        ROUTER.push(type === 'USER' ? '/welcome' : '/dashboard')
      }
    }
    setTimeout(() => {
      this.tokenData.loading = false
    }, 1000)
  },
  setToken(token){
    this.tokenData.token = token
    localStorage.setItem('usertoken', token)
    if(token){
      setTimeout(() => {
        let vue = new Vue()
        vue.APIRequest('authenticate/refresh', {}, (response) => {
          this.setToken(response['token'])
        }, (response) => {
          this.deaunthenticate()
        })
      }, 1000 * 60 * 60) // 50min
    }
  },
  authenticate(username, password, callback, errorCallback){
    let vue = new Vue()
    let credentials = {
      username: username,
      password: password,
      status: 'VERIFIED'
    }
    vue.APIRequest('authenticate', credentials, (response) => {
      this.tokenData.token = response.token
      vue.APIRequest('authenticate/user', {}, (userInfo) => {
        this.tokenData.loading = true
        let parameter = {
          'condition': [{
            'value': userInfo.id,
            'clause': '=',
            'column': 'id'
          }]
        }
        vue.APIRequest('accounts/retrieve', parameter).then(response => {
          if(response.data.length > 0){
            this.otpDataHolder.userInfo = userInfo
            this.otpDataHolder.data = response.data
            this.checkOtp(response.data[0].notification_settings)
          }
        })
        this.retrieveNotifications(userInfo.id)
        // this.retrieveMessages(userInfo.id, userInfo.account_type)
        if(callback){
          callback(userInfo)
        }
      })
    }, (response, status) => {
      if(errorCallback){
        errorCallback(response, status)
      }
    })
  },
  checkAuthentication(callback, flag = false){
    this.tokenData.verifyingToken = true
    let token = localStorage.getItem('usertoken')
    if(token){
      if(flag === false){
        this.tokenData.loading = true
      }
      this.setToken(token)
      let vue = new Vue()
      vue.APIRequest('authenticate/user', {}, (userInfo) => {
        let parameter = {
          'condition': [{
            'value': userInfo.id,
            'clause': '=',
            'column': 'id'
          }]
        }
        vue.APIRequest('accounts/retrieve', parameter).then(response => {
          let profile = response.data[0].account_profile
          let notifSetting = response.data[0].notification_settings
          let subAccount = response.data[0].sub_account
          let location = response.data[0].location
          this.setUser(userInfo.id, userInfo.username, userInfo.email, userInfo.account_type, userInfo.status, profile, notifSetting, subAccount, userInfo.code, location, true)
        }).done(response => {
          this.tokenData.verifyingToken = false
          let location = window.location.href
          if(this.currentPath){
            // ROUTER.push(this.currentPath)
          }else{
            window.location.href = location
          }
        })
        this.retrieveNotifications(userInfo.id)
        // this.retrieveMessages(userInfo.id, userInfo.account_type)
        this.getGoogleCode()
      }, (response) => {
        this.setToken(null)
        this.tokenData.verifyingToken = false
        ROUTER.push({
          path: this.currentPath
        })
      })
      return true
    }else{
      this.tokenData.verifyingToken = false
      this.setUser(null)
      return false
    }

  },
  deaunthenticate(){
    console.log('logging out')
    this.tokenData.loading = true
    localStorage.removeItem('usertoken')
    localStorage.removeItem('account_id')
    localStorage.removeItem('google_code')
    localStorage.removeItem('google_scope')
    this.setUser(null)
    let vue = new Vue()
    vue.APIRequest('authenticate/invalidate')
    this.clearNotifTimer()
    this.tokenData.token = null
    ROUTER.go('/')
  },
  retrieveNotifications(accountId){
    let vue = new Vue()
    let parameter = {
      'account_id': accountId
    }
    vue.APIRequest('notifications/retrieve', parameter).then(response => {
      if(response.data.length > 0){
        this.user.notifications.data = response.data
        this.user.notifications.current = response.size
        if(this.user.notifications.current > 0){
          // this.playNotificationSound()
        }
      }else{
        this.user.notifications.data = null
        this.user.notifications.current = null
      }
    })
  },
  addNotification(notification){
    if(notification.payload !== undefined){
      if(parseInt(this.user.userID) === parseInt(notification.to)){
        if(this.user.notifications.data === null){
          this.user.notifications.data = []
          this.user.notifications.data.push(notification)
          this.user.notifications.current = 1
        }else{
          this.user.notifications.data.unshift(notification)
          this.user.notifications.current += 1
        }
        let audio = require('src/assets/audio/notification.mp3')
        let sound = new Howl({
          src: [audio]
        })
        sound.play()
      }
    }else if(parseInt(this.user.userID) === parseInt(notification.id)){
      $('#alertModal').modal('show')
      COMMON.alertFlag = true
      this.playNotificationSound(true)
    }else{
      $('#alertModal').modal('hide')
      COMMON.alertFlag = false
    }
  },
  addOrder(order){
    if (order.data) {
      if (parseInt(this.user.subAccount.merchant.code) === parseInt(order.data.merchant)) {
        this.user.orders.unshift(order.data)
        let audio = require('src/assets/audio/notification.mp3')
        let sound = new Howl({
          src: [audio]
        })
        sound.play()
      }
    }
  },
  retrieveMessages(accountId, type){
    let vue = new Vue()
    let parameter = {
      account_id: accountId
    }
    vue.APIRequest('messenger_groups/retrieve_summary_payhiram', parameter).then(response => {
      if(response.data !== null){
        this.user.messages.data = response.data
        this.user.messages.totalUnreadMessages = response.size
      }else{
        this.user.messages.data = null
        this.user.messages.totalUnreadMessages = null
      }
    })
  },
  addMessage(message){
    if(parseInt(message.messenger_group_id) === this.messenger.messengerGroupId && parseInt(message.account_id) !== this.user.userID){
      $('#alertModal').modal('show')
      this.playNotificationSound()
      this.messenger.messages.push(message)
    }
  },
  startNotifTimer(accountId){
    if(this.notifTimer.timer === null){
      this.notifTimer.timer = window.setInterval(() => {
        if(accountId !== null){
          this.retrieveNotifications(accountId)
        }
      }, this.notifTimer.speed)
    }
  },
  clearNotifTimer(){
    if(this.notifTimer.timer !== null){
      window.clearInterval(this.notifTimer.timer)
      this.notifTimer.timer = null
    }
  },
  playNotificationSound(flag = true){
    let sound = null
    let audio = require('src/assets/audio/notification.mp3')
    if(flag === true){
      sound = new Howl({
        src: [audio]
      })
      setTimeout(() => {
        setInterval(() => {
          sound.play()
        }, 2000)
      }, 100)
    }else{
      ROUTER.go('/')
    }
  },
  playNotificationSoundOnce(){
    let audio = require('src/assets/audio/notification.mp3')
    let sound = new Howl({
      src: [audio]
    })
    sound.play()
  },
  checkPlan(){
    if(Config.plan === true){
      if(this.user.plan !== null){
        if(this.user.plan.title === 'Expired' && this.user.type !== 'ADMIN'){
          ROUTER.push('/plan')
        }
      }
    }
  },
  redirect(path){
    ROUTER.push(path)
  },
  validateEmail(email){
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/
    if(reg.test(email) === false){
      return false
    }else{
      return true
    }
  },
  checkOtp(setting){
    if(setting !== null){
      if(parseInt(setting.email_otp) === 1 || parseInt(setting.sms_otp) === 1){
        // ask otp code here
        $('#otpModal').modal({
          backdrop: 'static',
          keyboard: true,
          show: true
        })
      }else{
        this.proceedToLogin()
      }
    }else{
      this.proceedToLogin()
    }
  },
  proceedToLogin(){
    this.setToken(this.tokenData.token)
    let userInfo = this.otpDataHolder.userInfo
    let data = this.otpDataHolder.data
    let profile = data[0].account_profile
    let notifSetting = data[0].notification_settings
    let subAccount = data[0].sub_account
    let location = data[0].location
    this.setUser(userInfo.id, userInfo.username, userInfo.email, userInfo.account_type, userInfo.status, profile, notifSetting, subAccount, userInfo.code, location, true)
  },
  setGoogleCode(code, scope){
    localStorage.setItem('google_code', code)
    localStorage.setItem('google_scope', scope)
    this.google.code = code
    this.google.scope = scope
  },
  getGoogleCode(){
    this.google.code = localStorage.getItem('google_code')
    this.google.scope = localStorage.getItem('google_scope')
  },
  displayAmount(amount){
    // amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '1,')
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    })
    return formatter.format(amount)
  },
  displayAmountWithCurrency(amount, currency){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })
    return formatter.format(amount)
  },
  showRequestType(type){
    switch(parseInt(type)){
      case 1: return 'Send'
      case 2: return 'Withdrawal'
      case 3: return 'Deposit'
      case 101: return 'Lending'
      case 102: return 'Installment'
    }
  },
  manageRider(data){
    if(data.merchant === this.user.subAccount.merchant.code && data.assigned_rider !== undefined){
      this.user.riders.push(data)
      this.playNotificationSoundOnce()
    }else{
    }
  }
}
