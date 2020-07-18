<template>
<div class="empty">
	<div class="jumbotron" id="jumboID">
		<div class="position-absolute w-100">
			<!-- <img class="img-fluid" src="https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg"> -->
		</div>
		<h1 class="display-4 text-white">Express your love with Runway Express</h1>
		<p class="lead text-white">Refer 5 friends and get a ₱100 coupon on us!</p>
		<hr class="my-4">
			<div class="container row m-0 justify-content-around w-100">
						<!-- card starts -->
						<div class="card mb-5" style="width: 18rem;" v-for="(item, index) in featured" :key="index" >
							<!-- <img src="..." class="card-img-top" alt="..."> -->
							<div class="card-body">
								<h5 class="card-title"><img class="img-fluid" :src="'http://' + item.img_url"> </h5>
								<p class="card-text">{{item.text}}</p>
								<a href="#" class="btn btn-primary">Link to somewhere</a>
					</div>
				</div>
                
			</div>
			<!-- <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
		</div>
	</div>
</template>
<style scoped>
    #banner{
       z-index: -1;
       top: 0;
       left: 0;
       background-color:orange;
    }
    #jumboID{
        background:url(~assets/img/featured.png) top/100% no-repeat;
	}
	.container{
		max-width: unset;
	}
    .empty{
      width: 100%;
      margin-top: 25px;
      margin-bottom: 25px;
      float: left;
      min-height: 450px;
      overflow-y: hidden;
      text-align: center;
      border: solid 1px #ddd;
    }   .empty i{
      font-size: 100px;
      padding-top: 150px;
    }
    .empty span{
      width: 100%;
      float: left;
    }   .empty .description{
      font-size: 24px;
    }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import axios from 'axios'
import {featuredProducts} from 'src/data-test.js'
export default {
  mounted(){
    console.log(this.featured)
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      featured: featuredProducts
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
