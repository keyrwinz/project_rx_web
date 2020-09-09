<template>

	<div class="incre-row">
    <div v-for="(item, index) in settings.page" :key="index" class="cw-banner" :style="{'background': item.background}">
      <div class="text">
        <span class="title">
          <h2>{{item.title}}</h2>
        </span>
        <span class="description">
          <p>
            <b>{{item.description}}</b>
          </p>
        </span>
        <span class="text-center">
          <a class="" :href="common.appUrl.android" v-if="common.appUrl.android !== null">
           <img class="button img-fluid float-left" alt='Get it on Google Play' :src="require('assets/img/playstoreblack.png')"/>
          </a>
          <a style="margin-left: 10px;" :href="common.appUrl.ios" v-if="common.appUrl.ios !== null" >
           <img class="button img-fluid float-left" alt='Get it on App Store' :src="require('assets/img/appstoreblack.png')"/>
          </a>
        </span>
      </div>
      <div class="image" v-if="item.template === 'right'">
        <img :src="item.image" width="100%;" height="auto">
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
  margin-left: 7%;
  margin-top: 150px;
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
  margin-right: 7%;
  float: left;
  margin-left: 1%;
  display: block;
  margin-top: 50px;
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
    width: 100%;
    margin-right: 0%;
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
      settings: SETTINGS,
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
