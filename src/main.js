// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config.js'
/* eslint-disable no-new */
if(config.PUSHER.flag === 'pusher'){
  Vue.use(require('vue-pusher'), {
    api_key: config.PUSHER.key,
    options: {
      cluster: 'ap1',
      encrypted: true
    }
  })
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
