<template>
  <div class="incre-row incre-search">
    <div class="input-container">
      <input type="text" name="locality" class="form-control" v-model="locality" placeholder="Type city or municipality">
      <button class="btn btn-primary">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.incre-search{
  width: 100%;
  float: left;
  height: 600px;
  display: table;
}

.input-container{
  display: table-cell;
  vertical-align: middle;
}

.btn{
  height: 50px !important;
  margin-left: 10px;
}

.form-control{
  width: 30% !important;
  height: 50px !important;
  float: left;
  margin-left: 35%;
}

@media screen and (max-width: 992px){
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
export default {
  mounted(){
    this.getData()
  },
  data(){
    return {
      locality: null
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
