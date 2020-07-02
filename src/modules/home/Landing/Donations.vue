<template>
	<div class="cw-features">
    <div class="header">
      <span class="title text-green text-center">
        <h1>Bayanihan ; Spirit of Communal Unity and Cooperation</h1>
      </span>
      <span class="description">
        <h6></h6>
      </span>
    </div>
    <div class="holder d-flex flex-row justify-content-center my-4 row w-100 mx-0 p-0">

      <!-- <a :href="item.donateLink" class="item text-light d-flex flex-column justify-content-center align-items-center py-5 col-lg-4 col-md-10" :style="{'background': 'linear-gradient(to left, ' + item.backgroundColor+'50, '+item.backgroundColor+'c0), url('+item.backgroundImg+') center/cover no-repeat'}" v-for="item, index in data" v-if="data !== null">
        <span class="icon text-center mb-1 mt-3">
          <div class="position-relative mx-auto" :style="{'-webkit-mask': 'url('+item.img+') center/auto 100% no-repeat'}"></div>
        </span>
        <div class="description mx-5 px-3 text-center">
            <button type="button" class="btn btn-dark btn-lg font-weight-bold">Donate</button>
            
        </div>
      </a> -->
      
      <span class="description text-center mb-5 col-10 mt-4">
          <h2>Time is not on our side but you can be</h2>
          <p class="my-4">
            Birdseye is a non-profit and is run by students, faculty, and other volunteers at the University of San Carlos.<br>
            We rely on donations to keep our site up and running and free for everyone to use.<br>
            As more municipalities use <b>Birdseye</b>, our cost of operations increase. You can help our cause by donating to us, even the smallest donations help.<br>
            <h4>Help keep Birdseye flying, donate today!</h4>
            <h4>Contact us through our <a href="https://www.facebook.com/birdseyeph/">Facebook Page</a></h4>
          </p>
        </span>
    </div>
	</div>
</template>
<style scoped>
.cw-features{
  width: 100%;
  float: left;
  min-height: 500px;
  background: #fff;
  overflow-y: hidden;
}
.header{
  width: 90%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 50px;
}
.holder{
  width: 100%;
  float: left;
}
.item{
  float: left; 
  min-height: 150px;
}
.item span{
  width: 100%;
  float: left;
}
.item .icon div{
  height: 80px;
  width: 100%;
  background: currentColor;
}
.item .title{
  margin-top: 25px;
}

.item .description{
  text-align: justify;
  margin-top: 25px;
}

@media screen and (max-width: 992px){
  .holder, .item{
    width: 90%;
    margin: 25px 5% 0 5%;
  }
}
</style>
<script>
import ROUTER from '../../../router'
import AUTH from '../../../services/auth'
export default {
  mounted(){
  },
  data(){
    return {
      data: [
        {img: require('assets/img/paypal.png'), backgroundColor: '#26b0ff', backgroundImg: require('assets/img/paypal-background.jpg')}, // test link https://goo.gl/9S8VGb
        {img: require('assets/img/gcash.png'), backgroundColor: '#297dfa', backgroundImg: require('assets/img/gcash-background.jpeg')},
        {img: require('assets/img/paymaya-logo.png'), backgroundColor: '#1760ff', backgroundImg: require('assets/img/paymaya-background.png')}
      ]
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
