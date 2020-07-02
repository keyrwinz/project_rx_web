// let LIVE_BACKEND_URL = 'https://api.payhiram.increment.ltd/public/increment/v1'
let LIVE_BACKEND_URL = 'http://api.birdseye.increment.ltd/public/increment/v1'
let DEV_BACKEND_URL = 'http://localhost/project123/api/public/increment/v1'
let isDev = false
let broadcastFlag = 'pusher' // self, pusher
let BACKEND_URL = isDev ? DEV_BACKEND_URL : LIVE_BACKEND_URL
let pusherKey = isDev ? 'ASDASDD' : 'ASDASDD'
let wsHost = isDev ? '127.0.0.1' : 'apiv1.payhiram.increment.ltd'
let wsPort = isDev ? 6001 : 8001
export default{
  IS_DEV: false,
  API_URL: BACKEND_URL + '/',
  IMAGE_URL: BACKEND_URL + '/image/',
  BACKEND_URL: BACKEND_URL,
  PUSHER: {
    flag: broadcastFlag,
    key: broadcastFlag === 'pusher' ? '4807f0adf6b9535971c0' : pusherKey,
    wsHost: wsHost,
    wsPort: wsPort
  },
  APP_NAME: 'TINABANGAY',
  APP_NAME_VHTML: 'TINABANGAY',
  APP_EMAIL: 'support@payhiram.ph',
  USER_TYPE: [{
    title: 'USER'
  }, {
    title: 'INVESTOR'
  }]
}
