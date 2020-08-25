<template>
  <div class="text-center">
    <ul>
      <li v-for="(item, index) in options" :key="index" @click="redirect(item.route)">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
ul{
  list-style: none;
  height: 50px;
  margin: 0px;
  padding: 0px;
  float: left;
  margin-bottom: 25px;
}
li{
  width: 200px;
  line-height: 50px;
  text-align: center;
  float: left;
  border: solid 1px $primary;
}

li:hover{
  cursor: pointer;
  text-decoration: underline;
}

.active{
  background: $primary;
  color: white;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'test-banner': require('components/increment/imarketvue/delivery/ViewProducts.vue')
  },
  mounted(){
  },
  data(){
    return {
      options: [{
        title: 'Accounts',
        route: '/admin/accounts'
      }, {
        title: 'Charges',
        route: '/admin/charges'
      }, {
        title: 'Promos',
        route: '/admin/promos'
      }]
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
