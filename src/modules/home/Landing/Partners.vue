<template>
	<div class="cw-features bg-light">
    <div class="header">
      <span class="title text-green text-center">
        <h1>Many Thanks to Our Partners!</h1>
      </span>
      <span class="description">
        <h6></h6>
      </span>
    </div>
    <div class="holder d-flex flex-row justify-content-center align-items-center my-4 row w-100 mx-0 p-0">
      <div class="border-0 m-3" style="max-width: 25rem;" v-for="(item, index) in data" :key="index">
        <div class="p-3 text-capitalize">
          <h6 v-if="!item.img">{{item.name}}</h6>
          <img v-else :src="item.img" :alt="item.name" class="img-fluid">
        </div>
      </div>
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
.shadow{
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.header{
  width: 90%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 50px;
}
.text-capitalize {
  text-transform: uppercase !important;
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
      $.get('https://spreadsheets.google.com/feeds/cells/1di9gJrHSrzCJ61XitNlNV5zga8v2LHas0VdNVNfNO3I/2/public/values?alt=json', response => {
        let entries = response.feed.entry
        for (var i = 0; i < entries.length; i += 2) {
          if(i > 1){
            let object = {
              img: COMMON.APP_URL + '/static/img/' + entries[i].content.$t,
              name: entries[i + 1].content.$t
            }
            this.data.push(object)
          }
        }
      })
    }
  }
}
</script>
