<template>
  <div v-if="data !== null">
      <div class="marketplace-product-holder" v-bind:class="listStyle" v-for="(item, index) in data" @click="redirect('marketplace/product/' + item.code)" :key="index"> 
        <div class="product-image">
          <img :src="config.BACKEND_URL + item.featured[0].url" v-if="item.featured !== null">
          <i class="fas fa-image" v-else></i>
        </div> 


        <div class="product-details">
          <div class="product-title" :style="{width: item.price === null ? '100%' : '100%'}" style="float: left;">
            
            <!-- <label v-html="item.description"></label> -->
            <label class="text-primary" style="padding-top: 5px;" v-if="item.price.length === 1"><b>{{currency.displayWithCurrency(item.price[0].price, item.price[0].currency)}}</b></label>
            <label class="text-primary" style="padding-top: 5px;" v-if="item.price.length > 1"><b>{{item.price[0].currency}} {{item.price[item.price.length - 1].price + ' - ' + item.price[0].price}}</b></label>
            <label><b>{{item.title}}</b></label>
            <installemnt-label :data="item.installment" v-if="item.installment !== null"></installemnt-label>
          </div>  
          <!-- <div class="products-price text-right" v-if="item.price !== null" style="width: 50%;float: left;padding: 5px;">
            <label>
              <label v-if="item.price.length === 1">{{currency.displayWithCurrency(item.price[0].price, item.price[0].currency)}}</label>
              <label v-if="item.price.length > 1">{{item.price[0].currency}} {{item.price[item.price.length - 1].price + ' - ' + item.price[0].price}}</label>
            </label>
          </div> -->
        </div>
      </div>
  </div>
  
</template>
<style scoped>
  .text{
    display: block;
    /* width: 100px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .price-label label:first-child{
      padding-top: 5px;
      margin-bottom: 0px !important;
  }
  .rating-holder{
    margin-bottom: 20px;
  }
  .list-style{
    display: flex;
    flex-direction: column;
  }
  .fourColumn img{
    max-width: 100%;
    height: auto;
    width: auto;
    min-height: 300px;
    max-height: 300px;
    margin: 20px auto 20px auto;
  }
  .marketplace-product-holder{
    float: left;
    margin-right: 1%;
    border: solid 1px #ddd;
    margin-bottom: 10px;
    color: #555;
    margin-top: 0px;
    margin-bottom: 25px;
  }
  .four-columns{
    width: 24%;
  }
  .three-columns{
    width: 32%;
  }
  .two-columns{
    width: 49%;
  }
  .marketplace-product-holder:hover{
    cursor: pointer;
    border: solid 1px #ffaa81;
    color: white;
    background: #ffaa81;
  }
  .product-image{
    width: 100%;
    float: left;
    position: relative;
    height: auto;
    text-align: center;
    overflow-y: hidden;
  }

  .product-image img{
    height: 250px;
    float: left;
    width: 100%;
  }
  .product-image .fa-image{
    font-size: 150px;
    line-height: 250px;
  }
  .product-details{
    margin-bottom: 15px;
    height: 50px;
    width: 100%;
    float: left;
    border-top: solid 1px #ddd;
  }
  .product-title{
    width: 50%;
    float: left;
    min-height: 50px;
  }
  
  .product-title label{
    width: 96%;
    float: left;
    font-size: 12px;
    margin: 0px !important;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }

  .product-star{
    width: 50%;
    float: left;
    height: 50px;
  }
  .product-star label{
    width: 100%;
    float: left;
    font-size: 10px;
    margin: 0px !important;
   
  }
  .product-price{
    width: 50%;
    float: left;
    height: 50px;
  }

  .product-wishlist{
    height: 50px;
    text-align: center;
    line-height: 50px;
    width: 100%;
    position: absolute;
    top: 50%;
    z-index: 10;
    display: none;
  }

  .product-wishlist:hover, .product-wishlist i:hover, .product-wishlist label:hover{
    cursor: pointer;
  }

  .product-wishlist label{
    line-height: 50px;
    float: left;
    width: 50%;
    text-align: center;
  }
  
  .product-wishlist i{
    font-size: 32px;
    line-height: 50px;
  }

  .product-holder:hover .product-wishlist{
    display: block;
  }
  @media (max-width: 991px){
    .product-holder{
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
  }

.rating {
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}
.rating > span:hover,
.rating > span:hover ~ span {
  color: transparent;
}
.rating > span:hover:before,
.rating > span:hover ~ span:before {
   content: "\2605";
   position: absolute;
   left: 0; 
   color: gold;
}

label {
    display: inline-grid;
}

body { padding: 100px; }


</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
import axios from 'axios'
export default {
  mounted(){
    if(this.user.type === 'USER') {
      ROUTER.push('/welcome')
    }
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      total: 0,
      avg: 0,
      stars: 0,
      status: true,
      currency: CURRENCY,
      common: COMMON
    }
  },
  props: ['data', 'listStyle'],
  components: {
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'generic-filter': require('components/increment/imarketvue/marketplace/Filter.vue'),
    'installemnt-label': require('components/increment/imarketvue/installment/labelMarketplace.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
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
        }
      })
    }
    addToWishlist(id){
      let parameter = {
        payload: 'product',
        payload_value: id,
        account_id: this.user.userID
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('wishlists/create', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.$parent.retrieve()
      })
    }
  }
}
</script>
