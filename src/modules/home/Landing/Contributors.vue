<template>
  <div class="cw-snetwork bg-light pb-5">
    <div class="text text-green text-center">
      <h1>Contributors</h1>
    </div>
    <div class="card-holder">
      <div class="card img-full" v-for="(item, index) in data" :key="index" :style="{'background-image': 'url('+item.img+')'}">
        <div class="card-body pt-4 text-light">
          <h5 class="card-title text-green">{{item.name}}</h5>
          <p class="card-text">{{item.org}} <br> {{item.position}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cw-snetwork{
  width: 100%;
  float: left;
  min-height: 650px;
  overflow-y: hidden;
}

.card.img-full {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 250px;
  border-radius: 10px;
}

.card.img-full.shadow {
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.card.img-full .card-body {
  position: absolute;
  width: 100%;
  bottom: 0;
  min-height: 40%;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 50%);
  border-radius: 0 0 10px 10px;
}

.text{
  width: 90%;
  float: left;
  margin-right: 10%;
  margin-top: 50px;
  height: 50px;
  margin-left: 5%;
  margin-right: 5%;
}

.text .title{
  width: 100%;
  float: left;
}

.title h1{
  font-size: 40px;
}

.text .description{
  margin-top: 25px;
  width: 100%;
  float: left;
  text-align: justify;
}

.image{
  width: 40%;
  margin-left: 10%;
  float: left;
  margin-top: 150px;
  display: block;
}
.card-holder{
  width: 90%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
}
.card{
  width: 24%;
  float: left;
  margin-right: 1%;
  margin-top: 10px;
  margin-top: 10px;
}
.card-body{
  text-align: justify;
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

  .card{
    width: 100%;
    margin-left: 0%;
    margin-right: 0%;
  }
}

</style>
<script>
import ROUTER from '../../../router'
import AUTH from '../../../services/auth'
import COMMON from 'src/common.js'
export default {
  mounted(){
    this.getData()
  },
  data(){
    return {
      data: []
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    getData() {
      $.get('https://spreadsheets.google.com/feeds/cells/1di9gJrHSrzCJ61XitNlNV5zga8v2LHas0VdNVNfNO3I/1/public/values?alt=json', response => {
        let entries = response.feed.entry
        for (var i = 0; i < entries.length; i += 4) {
          if(i > 3){
            let object = {
              img: COMMON.APP_URL + '/static/img/' + entries[i].content.$t,
              name: entries[i + 1].content.$t,
              org: entries[i + 2].content.$t,
              position: entries[i + 3].content.$t
            }
            this.data.push(object)
          }
        }
      })
    }
  }
}
</script>
