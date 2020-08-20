<template>
  <div>
    <div class="container-fluid mt-5 d-flex align-items-center justify-content-center flex-column text-center">
      <h1 class="fa fa-store mb-4"></h1>
      <h2 class="mb-4">Hello, dear customer!</h2>
      <p>Unfortunately, the Runway Express website is only available for use for our merchants and riders.</p>
      <p>Please access Runway Express through our mobile app.</p>
      <p><b>Download the app below!</b></p>
      <div class="container mx-auto row justify-content-center align-content-center w-75">
        <div class="col-md-3 col-sm-6"><img src="https://i.imgur.com/6aXmDH7.png" alt="Get it on Google Play" class="img-fluid"></div>
        <div class="col-md-3 col-sm-5 row align-items-center"><img src="https://i.imgur.com/UpykjFI.png" alt="Get it on the AppStore" class="img-fluid"></div>
      </div>
      <button type="button" class="btn btn-lg btn-primary font-weight-bold mt-4 mb-4" @click="goBack()">Go Back</button>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
@import "~assets/style/colors.scss";

h1.fa {
  font-size: 5rem;
}

button.btn {
  height: unset !important;
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
    if(!this.user.userID) {
      ROUTER.push('/')
    }
  },
  data(){
    return {
      user: AUTH.user
    }
  },
  methods: {
    goBack() {
      AUTH.deaunthenticate()
    }
  }
}
</script>
