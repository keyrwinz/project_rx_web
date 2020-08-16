let LIVE_BACKEND_URL = 'http://api.runwayexpress.co.uk/server.php/increment/v1'
let DEV_BACKEND_URL = 'http://localhost/project_rx_api/public/increment/v1'
let isDev = false
let broadcastFlag = 'pusher' // self, pusher
let BACKEND_URL = isDev ? DEV_BACKEND_URL : LIVE_BACKEND_URL
let pusherKey = isDev ? 'ASDASDD' : 'ASDASDD'
let wsHost = isDev ? '127.0.0.1' : 'apiv1.runwayexpress.increment.ltd'
let wsPort = isDev ? 6001 : 8001
export default{
  IS_DEV: isDev,
  API_URL: BACKEND_URL + '/',
  IMAGE_URL: BACKEND_URL + '/image/',
  BACKEND_URL: BACKEND_URL,
  PUSHER: {
    flag: broadcastFlag,
    key: broadcastFlag === 'pusher' ? '92d03f6cdbc9b3e7467b' : pusherKey,
    wsHost: wsHost,
    wsPort: wsPort
  },
  APP_NAME: 'RUNWAY EXPRESS',
  APP_NAME_VHTML: 'RUNWAY EXPRESS',
  APP_EMAIL: 'support@increment.ltd',
  USER_TYPE: [{
    title: 'USER'
  }, {
    title: 'AGENCY'
  }],
  GOOGLE_API_KEY: 'AIzaSyAxT8ShiwiI7AUlmRdmDp5Wg_QtaGMpTjg',
  GOOGLE_CLIENT_ID: '110121744042-m2q8b6gjnor8q8njmu1dkgtsieek9as2.apps.googleusercontent.com'
}