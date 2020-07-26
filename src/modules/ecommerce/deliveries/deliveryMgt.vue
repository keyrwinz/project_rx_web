<template>
  <div class="col-12">
    <div class="col-8 mx-auto">
      <b-table striped hover :items="items"></b-table>
    </div>
  </div>
</template>
<style>
  .empty{
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
    float: left;
    min-height: 450px;
    overflow-y: hidden;
    text-align: center;
    border: solid 1px #ddd;
  }

  .empty i{
    font-size: 100px;
    padding-top: 150px;
  }
  .empty span{
    width: 100%;
    float: left;
  }

  .empty .description{
    font-size: 24px;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import axios from 'axios'
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      items: [{ rider: 'Juan dela Cruz', locale: 'Cebu', source: 'McDonalds Tabok', destination: 'Palmas Verdes Subdivision, Tabok, Mandaue City', status: 'complete' }
      ]
    }
  },
  props: ['title', 'action'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
