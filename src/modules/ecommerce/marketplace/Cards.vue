<template>
  
<div class="empty">
    <div class="jumbotron">
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">Init pa ang lumpia dong, naa sa'y utan diha if ganahan ka</p>
  <hr class="my-4">
  <div class="container">
		<div class="row">
			<div class="col-sm">
				<div class="card" style="width: 18rem;">
					<!-- <img src="..." class="card-img-top" alt="..."> -->
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						<a href="#" class="btn btn-primary">Go somewhere</a>
					</div>
				</div>
			</div>
			<div class="col-sm">
				<div class="card" style="width: 18rem;">
					<!-- <img src="..." class="card-img-top" alt="..."> -->
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						<a href="#" class="btn btn-primary">Go somewhere</a>
					</div>
				</div>
			</div>
			<div class="col-sm">
				<div class="card" style="width: 18rem;">
					<!-- <img src="..." class="card-img-top" alt="..."> -->
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						<a href="#" class="btn btn-primary">Go somewhere</a>
					</div>
				</div>
			</div>
		</div>
	</div>
  <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
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
      config: CONFIG
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
