<template>
  <div>
    <cards  :header="'Hungry?'"
            :subheader="'Grab a snickers :D'"
            :listType="'published'"
    ></cards>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.marketplace-holder{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
  margin-bottom: 50px;
}
.banner{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding: 20px;
  background: #ffaa81;
  margin-bottom: 15px;
}
.product-holder{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
  margin-top: 25px;
}
.product-holder .results{
  width: 100%;
  font-size: left;
  min-height: 10px;
  overflow-y: hidden;
}
.product-holder .list{
    display: flex;
    flex-direction: column;
}
#attach-file {
  color: $primary;
  font-size: 7em;
  margin-right: 150p;
}
.modal-body {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.modal-body img {
  width: 40%;
  max-width: 150px;
}
.modal-body img:hover {
  cursor: pointer;
}
.divider {
  border-left: 1px solid rgba(0,0,0,0.2);
  height: 120px;
}
@media (max-width: 992px){
  .modal-body {
    flex-direction: column;
  }
  .divider {
    border-top: 1px solid rgba(0,0,0,0.2);
    width: 120px;
    height:1px;
    margin-bottom: 10px;
  } 
}
.modal-content {
    max-width: 700px;
    margin: 0 auto;
}
.btn-primary {
    background: #22b173;
    border-color: #22b173;
}
select.btn.btn-white {
    border-color: lightgrey;
}
button.btn.btn-primary.dropdown-toggle {
    min-height: 40px;
}
option {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-left: .3em solid transparent;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import axios from 'axios'
export default {
  mounted(){
    if(this.user.type === 'USER') {
      ROUTER.push('/welcome')
    }
    this.retrieve({'title': 'asc'}, {column: 'title', value: ''})
    this.test()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      data: null,
      listStyle: 'four-columns',
      filterValue: '',
      common: COMMON,
      category: [{
        title: 'Company',
        sorting: [{
          title: 'Title ascending',
          payload: 'title',
          payload_value: 'asc'
        }, {
          title: 'Title descending',
          payload: 'title',
          payload_value: 'desc'
        }]
      }, {
        title: 'Product',
        sorting: [{
          title: 'Title ascending',
          payload: 'title',
          payload_value: 'asc'
        }, {
          title: 'Title descending',
          payload: 'title',
          payload_value: 'desc'
        }, {
          title: 'Description ascending',
          payload: 'description',
          payload_value: 'asc'
        }, {
          title: 'Description descending',
          payload: 'description',
          payload_value: 'desc'
        }]
      }]
    }
  },
  components: {
    'products': require('components/increment/imarketvue/marketplace/Products.vue'),
    'dynamic-empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'table-view': require('components/increment/imarketvue/product/TableView.vue'),
    'generic-filter': require('components/increment/imarketvue/marketplace/Filter.vue'),
    'cards': require('./Cards.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
      if(parameter === 'editor/v2'){
        AUTH.mode = 1
      }
    },
    test(){
      this.APIRequest('locations/retrieve').then(response => {
        console.log(response.data)
      })
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
    },
    attachFile(){
      alert('Attach FILE!')
    },
    attachTemplate(){
      alert('Attach TEMPLATE!')
    },
    manageGrid(event){
      switch(event){
        case 'th-large': this.listStyle = 'two-columns'
          break
        case 'th': this.listStyle = 'three-columns'
          break
        case 'list': this.listStyle = 'four-columns'
          break
      }
    }
  }
}
</script>
