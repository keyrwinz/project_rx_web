<template>
  <div class="cw-banner bg-white">
    <div class="image">
      <img src="../../../assets/img/3.png" style="margin-bottom: 5px;" width="100%">
    </div>
    <div class="text text-primary">
      <span class="title">
        <h1>Handle your investments</h1>
      </span>
      <span class="description">
        <h4>
          As investor, you are free to choose where to invest your money. Our marketplace allows you to choose specific borrower and invest your money to them.
        </h4>
      </span>
    </div>
  </div>
</template>
<style scoped>
.cw-banner{
  width: 100%;
  float: left;
  background: #22b173;
  height: 650px;
}
.text{
  width: 45%;
  float: left;
  margin-left: 5%;
  margin-top: 200px;
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
  margin-right: 5%;
  margin-left: 5%;
  float: left;
  margin-top: 150px;
  display: block;
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
import ROUTER from '../../../router'
import AUTH from '../../../services/auth'
export default {
  mounted(){
  },
  data(){
    return {
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
