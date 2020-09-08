<template>

  <div class="incre-row row" v-if="data !== null">
    <div class="cw-banner" :style="{'background': data.background}">
      <div class="image col-sm-6">
        <img :src="data.image" style="margin-bottom: 5px;" width="100%">
      </div>
      <div class="text col-sm-6" >
        <span class="title">
          <h2>{{data.title}}</h2>
        </span>
        <span class="description">
          <p>
            <b>{{data.description}}</b>
          </p>
        </span>
        <span class="text-center">
          <button class="btn btn-primary">Sign up today!</button>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.cw-banner{
  width: 100%;
  float: left;
  height: 600px;
}
.text{
  width: 35%;
  float: left;
  margin-right: 7%;
  margin-left: 1%;
  margin-top: 50px;
  color: $black;
}
.text .title{
  width: 100%;
  float: left;
}
.title h1{
  font-size: 50px;
}
.text .description{
  width: 100%;
  float: left;
  text-align: justify;
}
.image{
  width: 50%;
  float: left;
  margin-left: 7%;
  display: block;
}
.button{
  position:left;
  height: 50px;
  margin-right: 5px;
}

@media screen and (max-width: 992px){
  .text{
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
  }
  .title{
    text-align: center;
  }

  .image{
    display: none;
  }
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import SETTINGS from 'src/modules/home/settings.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
  },
  data(){
    return {
      data: SETTINGS.riders,
      common: COMMON
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
