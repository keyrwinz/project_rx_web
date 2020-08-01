<template>
	<div class="holder">
    <create :type="type" v-if="user.subAccount.merchant !== null && user.subAccount.merchant.status === 'verified'"></create>
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['th-large', 'list']">
    </filter-product>
    <div class="products-holder" v-for="item, index in data" @click="redirect('/product/edit/' + item.code)" v-if="listStyle === 'columns'">
      <div class="products-image">
        <img :src="config.BACKEND_URL + item.featured[0].url" v-if="item.featured !== null && getFileType(item.featured[0].url) === 'img'">
        <i class="fa fa-image" v-else></i>
      </div>
      <div class="products-details">
        <div class="products-title" :style="{width: item.price === null ? '100%' : '100%'}">
          <label class="text-primary" style="padding-top: 5px;" v-if="item.price.length === 1"><b>{{currency.displayWithCurrency(item.price[0].price, item.price[0].currency)}}</b></label>
            <label class="text-primary" style="padding-top: 5px;" v-if="item.price.length > 1"><b>{{item.price[0].currency}} {{item.price[item.price.length - 1].price + ' - ' + item.price[0].price}}</b></label>
            <label style="padding-bottom: 5px;"><b>{{item.title}}</b></label>
        </div>  
        <!-- <div class="products-price" v-if="item.price === null">
          <label v-if="item.price !== null">
            <label v-if="item.price.length === 1">PHP {{item.price[0].price}}</label>
            <label v-if="item.price.length > 1">PHP {{item.price[item.price.length - 1].price + ' - ' + item.price[0].price}}</label>
          </label>
        </div> -->
      </div>
    </div>
    <table-view :data="data" v-if="listStyle === 'list' && data !== null" :type="'products'"></table-view>
    <empty v-if="data === null" :title="empty.title" :action="empty.guide"></empty>
	</div>
</template>
<style>
	.holder{  
    width: 98%;
    float: left;
    margin-right: 2%;
	  margin-top: 25px;
	  margin-bottom: 50px;
	}
  .results{
    width: 100%;
    float: left;
    margin-top: 25px;
  }
  .item:hover{
    cursor: pointer;
  }

  .products-holder{
    width: 24%;
    float: left;
    height: 300px;
    margin-right: 1%;
    border: solid 1px #ddd;
    margin-bottom: 10px;
    color: #555;
    margin-top: 25px;
  }
  .products-holder:hover{
    cursor: pointer;
    border: solid 1px #ffaa81;
    background: #ffaa81;
    color: #fff;
  }

  .products-image{
    width: 100%;
    float: left;
    position: relative;
    height: 250px;
    text-align: center;
  }

  .products-image img{
    height: 250px;
    float: left;
    width: 100%;
  }
  .products-image .fa-image{
    font-size: 150px;
    line-height: 250px;

  }
  .products-details{
    height: 50px;
    width: 100%;
    float: left;
    border-top: solid 1px #ddd;
  }
  .products-title{
    width: 50%;
    float: left;
    height: 50px;
  }
  .products-title label{
    width: 96%;
    float: left;
    font-size: 12px;
    margin: 0px !important;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }
  .products-price{
    width: 50%;
    float: left;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    text-align: right;
    padding-right: 5px;
  }

  .products-wishlist{
    height: 50px;
    text-align: center;
    line-height: 50px;
    width: 100%;
    position: absolute;
    top: 50%;
    z-index: 10;
    display: none;
  }

  .products-wishlist:hover, .products-wishlist i:hover, .products-wishlist label:hover{
    cursor: pointer;
  }

  .products-wishlist label{
    line-height: 50px;
    float: left;
    width: 50%;
    text-align: center;
  }
  
  .products-wishlist i{
    font-size: 32px;
    line-height: 50px;
  }

  .products-holder:hover .products-wishlist{
    display: block;
  }

  @media (max-width: 992px){
    .products-holder{
      width: 98%;
      margin-left: 1%;
      margin-right: 1%;
    }
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
import COMMON from 'src/common.js'
import CURRENCY from 'src/services/currency.js'
export default {
  mounted(){
    this.retrieve({'title': 'asc'}, {column: 'title', value: ''})
    console.log(this.user)
    if(this.$route.params.type){
      this.type = this.$route.params.type
    }else{
      if(this.user.type !== 'MANUFACTURER'){
        this.type = 'd'
      }else{
        this.type = 'm'
      }
    }
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      data: null,
      selectedItem: null,
      selectedIndex: null,
      listStyle: 'list',
      type: null,
      category: [{
        title: 'Product',
        sorting: [{
          title: 'Title ascending',
          payload: 'title',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Title descending',
          payload: 'title',
          payload_value: 'desc',
          type: 'text'
        }]
      }],
      common: COMMON,
      currentFilter: null,
      currentSort: null,
      empty: {
        title: null,
        guide: null
      },
      currency: CURRENCY
    }
  },
  components: {
    'create': require('components/increment/imarketvue/product/Create.vue'),
    'table-view': require('components/increment/imarketvue/product/TableView.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'filter-product': require('components/increment/imarketvue/filter/Product.vue')
  },
  methods: {
    getFileType(url){
      console.log('endme')
      return url.substring(url.lastIndexOf('.')) === '.webm' ? 'vid' : 'img'
    },
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(sort, filter){
      if(this.user.subAccount.merchant === null){
        this.empty = {
          title: 'Empty Merchant!',
          guide: 'Go to My Profile then Merchant Settings and fill up necessary information.'
        }
        return false
      }
      if(filter !== null){
        this.currentFilter = filter
      }
      if(sort !== null){
        this.currentSort = sort
      }
      let parameter = {
        condition: [{
          value: this.currentFilter.value + '%',
          column: this.currentFilter.column,
          clause: 'like'
        }, {
          value: this.user.subAccount.merchant.id,
          column: 'merchant_id',
          clause: '='
        }],
        sort: this.currentSort,
        account_id: this.user.userID,
        inventory_type: this.common.ecommerce.inventoryType
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('products/retrieve_basic', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0){
          this.data = response.data
          if(this.selectedItem !== null){
            this.selectedItem = this.data[this.selectedIndex]
          }
        }else{
          this.data = null
          this.selectedIndex = null
          this.selectedItem = null
          this.empty = {
            title: 'Looks like you have not added a product!',
            guide: 'Click the New Product Button to get started.'
          }
        }
        console.log('sup hi')
        console.log(this.data)
      })
    },
    editModal(item, index){
      for (var i = 0; i < this.$children.length; i++) {
        if(this.$children[i].$el.id === 'updateProducts'){
          this.selectedItem = item
          this.selectedIndex = index
          this.$children[i].modal()
        }
      }
    },
    manageGrid(event){
      switch(event){
        case 'th-large': this.listStyle = 'columns'
          break
        case 'list': this.listStyle = 'list'
          break
      }
    }
  }
}
</script>
