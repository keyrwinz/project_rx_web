<template>
  <div class="cw-categories" id="services">
    <div class="holder">
      <span class="item text-center" v-for="item, index in data" v-if="data !== null" :class="{'active': item.title === selected.title}" @click="setSelected(item)">
        <i :class="item.icon" class="text-white" style="font-size:42px;"></i>
        <span class="title">
          <h5 class="text-white">{{item.title}}</h5>
        </span>
      </span>
    </div>
    <div class="holder holder-content" v-if="selected !== null">
      <div class="selected-details">
        <label><b>{{selected.description}}</b></label>
        <p>
          {{selected.subDescription}}
        </p>

        <span class="text-center">
          <a class="" :href="common.appUrl.android" v-if="common.appUrl.android !== null">
           <img class="button img-fluid float-left" width="48%" alt='Get it on Google Play' :src="require('assets/img/playstoreblack.png')"/>
          </a>
          <a :href="common.appUrl.ios" v-if="common.appUrl.ios !== null" >
           <img class="button img-fluid" width="48%" style="margin-left: 5px;" alt='Get it on App Store' :src="require('assets/img/appstoreblack.png')"/>
          </a>
        </span>

<!--         <p style="font-size:12px;">
          {{selected.partDescription}}
        </p> -->

      </div>
      <div class="selected-image">
        <img :src="selected.image" width="80%" height="60%">
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.text-primary{
  color: $primary !important;
}
.cw-categories{
  width: 100%;
  float: left;
  min-height: 70vh;
  background: $primary;
  overflow-y: hidden;
}
.header{
  width: 80%;
  float: left;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 50px;
}
.holder{
  width: 90%;
  float: left;
  margin: 50px 5% 50px 5%;
}
.item{
  width: 14%;
  float: left; 
  border-bottom: solid 5px $primary;
}

.active{
  border-bottom: solid 5px $white;
}

.item:hover{
  cursor: pointer;
  border-bottom: solid 5px $white;
}

.item span{
  width: 100%;
  float: left;
}
.item .icon{
  font-size: 50px;
}
.item .title{
  margin-top: 25px;
}

h5{
  font-size:15px;
}

.item .description{
  text-align: justify;
  padding-top: 25px;
  width: 100%;
  float: left;
}

.img-header{
  width: 90%;
  float: left;
  height: auto;
  margin-left: 5%;
}

.selected-details{
  width: 35%;
  float: left;
  height: 325px;
  background: $white;
  color: $black;
  text-align: justify;
  padding: 50px;
}

.selected-details label{
  width: 100%;
  padding: 15px 0px 15px 0px;
  border-bottom: solid 1px $black;
}

.selected-details p{
  width: 100%;
  font-size:14px;
}

.selected-image{
  width: 65%;
  float: left;
  text-align:center;
  margin-top: 5px;
}

.button{
  position:left;
  height: 50px;
  margin-right: 5px;
}

@media screen and (max-width: 992px){
  .holder, .item{
    width: 90%;
    margin: 25px 5% 50px 5%;
  }
  .holder-content{
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
      data: SETTINGS.categories,
      selected: SETTINGS.categories[0],
      common: COMMON
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    setSelected(item){
      this.selected = item
    }
  }
}
</script>
