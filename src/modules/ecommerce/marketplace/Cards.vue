<template>
<div class="empty">
	<div class="jumbotron mb-0" id="jumboID">
		<div class="position-absolute w-100">
			<!-- <img class="img-fluid" src="https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg"> -->
		</div>
		<h1 class="display-4 text-white">{{header}}</h1>
		<p class="lead text-white">{{subheader}}</p>
		<hr class="my-4">
			<div class="container row m-0 justify-content-around w-100">
						<!-- card starts -->
						<div class="card mb-5" style="width: 18rem;" v-for="(item, index) in this.data" :key="index" >
							<!-- <img src="..." class="card-img-top" alt="..."> -->
							<div class="card-body row m-0 flex-column justify-content-end">
								<h5 class="card-title">
                  <img class="card-img-top" :src="config.BACKEND_URL + item.featured[0].url">
                  {{item.title}}
                </h5>
								<p class="card-text align-bottom">{{item.price[0].currency === 'PHP' ? '₱' : ''}} {{item.price[0].price}}</p>
								<button @click="redirect('/marketplace/product/'+item.code+'/preview')" class="btn btn-primary">View product page</button>
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
  /* .card .img-fluid{
    min-height: 5rem;
  } */
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
      border: none;
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
    this.retrieve({'title': 'asc'}, {column: 'title', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      featured: featuredProducts,
      data: null
    }
  },
  props: {
    title: {
      required: false
    },
    action: {
      required: false
    },
    listType: {
      required: false
    },
    header: {
      required: false
    },
    subheader: {
      required: false
    }
  },
  methods: {
    redirect(parameter, item = null){
      if(item === null){
        AUTH.redirect(parameter)
      }else{
        this.updateMessages(parameter, item)
      }
    },
    retrieve(sort, filter){
      let parameter = {
        condition: [{
          value: 'published',
          column: 'status',
          clause: '='
        }, {
          value: 'regular',
          column: 'type',
          clause: '='
        }, {
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }],
        sort: sort,
        account_id: this.user.userID,
        inventory_type: COMMON.ecommerce.inventoryType
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('products/retrieve_basic', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          console.log(this.data)
          if(this.listType === 'featured'){
            this.data = this.data.filter(product => product.status !== 'featured')
            console.log('sulod')
            console.log(this.data)
          }
        }
      })
    }
  }
}
</script>
