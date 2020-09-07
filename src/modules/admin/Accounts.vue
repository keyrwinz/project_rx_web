<template>
  <div class="ledger-summary-container">
    
    <management-options />

    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead class="bg-primary">
        <tr>
          <td>Date</td>
          <td>Username</td>
          <td>Email</td>
          <td>Type</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.created_at}}</td>
          <td>
            <label class="action-link text-primary">
              <!-- {{item.account.location !== null ? '(' + item.account.location.code + ')' : ''}} -->
              {{item.username}}
            </label>
          </td>
          <td>{{item.email}}</td>
          <td>
            <label v-if="editTypeIndex !== index">{{item.account_type}}</label>
            <i class="fa fa-edit text-primary" style="margin-left: 10px;" @click="setEditTypeIndex(index, item)" v-if="editTypeIndex !== index"></i>
            <span v-if="editTypeIndex === index">
              <select class="form-control" v-model="newAccountType" style="float: left; width: 70%;">
                <option v-for="(typeItem, typeIndex) in ['USER', 'MERCHANT', 'RIDER', 'ADMIN']" :key="typeIndex">{{typeItem}}</option>
              </select>
              <i class="fa fa-check text-primary" style="margin-left: 5px; float: left;" @click="updateType(item, index)"></i>
              <i class="fa fa-times text-danger" style="margin-left: 5px; float: left;" @click="setEditTypeIndex(index, item)"></i>
            </span>
          </td>
          <td>{{item.status}}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-cog"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" v-if="item.account_type !== 'USER'" @click="showAddressModal(item)"><i class="fa fa-map-marker-alt"></i> Scope location</a>
                <a class="dropdown-item" @click="validateAccount(item)"><i class="fa fa-map-marker-alt"></i> Validate Account</a>
                <a class="dropdown-item" @click="validateMerchant(item)"><i class="fa fa-map-marker-alt"></i> Validate Merchant</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
      />


    <div class="modal fade" id="addAddressAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Assign Location</h5>
            <button type="button" class="close" @click="hideModal('#addAddressAccount')" aria-label="Close">
              <span aria-hidden="true" class="text-primary">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group" v-if="locationMessage !== null">
              <label>{{locationMessage}}</label>
            </div>
            <div class="form-group">
              <label>Scope Code</label>
              <input type="text" class="form-control form-control-custom" v-model="scopeLocation" placeholder="Type code">
            </div>
            <div v-if="selectedLocation === null">
              <label>Search location</label>
              <google-autocomplete-location
                :property="googleProperty"
                ref="location"
                @onFinish="manageLocation($event)">
                </google-autocomplete-location>
            </div>
            <div v-if="selectedLocation !== null">
              <label>
                {{selectedLocation.route + ', ' + selectedLocation.locality + ', ' + selectedLocation.country}}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal('#addAddressAccount')">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitLocation()">Submit</button>
          </div>
        </div>
      </div>
    </div>


    <empty v-if="data === null" :title="'No accounts available!'" :action="'Keep growing.'"></empty>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important;
  color: $white !important;
}

.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
}

.ledger-summary-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}
.summary-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.summary-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}

td i {
  padding-right: 0px !important;
  padding-left: 0px !important;
}

.form-control-custom{
  height: 45px !important;
}

@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
export default{
  mounted(){
    if(this.user.type !== 'ADMIN'){
      ROUTER.push('/marketplace')
    }
    // $('#loading').css({display: 'block'})
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      selecteditem: null,
      errorMessage: null,
      config: CONFIG,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Username ascending',
          payload: 'username',
          payload_value: 'asc'
        }, {
          title: 'Username descending',
          payload: 'username',
          payload_value: 'desc'
        }, {
          title: 'Email ascending',
          payload: 'email',
          payload_value: 'asc'
        }, {
          title: 'Email descending',
          payload: 'email',
          payload_value: 'desc'
        }, {
          title: 'Type ascending',
          payload: 'account_type',
          payload_value: 'asc'
        }, {
          title: 'Type descending',
          payload: 'account_type',
          payload_value: 'desc'
        }, {
          title: 'Status ascending',
          payload: 'status',
          payload_value: 'asc'
        }, {
          title: 'Status descending',
          payload: 'status',
          payload_value: 'desc'
        }, {
          title: 'Created ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Created descending',
          payload: 'created_at',
          payload_value: 'desc'
        }]
      }],
      filter: null,
      sort: null,
      editTypeIndex: null,
      newAccountType: null,
      selectedAccount: null,
      limit: 5,
      activePage: 1,
      numPages: null,
      selectedItem: null,
      location: null,
      scopeLocation: null,
      googleProperty: {
        style: {
          height: '45px !important'
        },
        GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
        results: {
          style: {
          }
        },
        placeholder: 'Type Location'
      },
      locationFlag: 'autocomplete',
      selectedLocation: null,
      locationMessage: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'google-autocomplete-location': require('src/components/increment/generic/location/GooglePlacesAutoComplete.vue'),
    'management-options': require('modules/admin/Menu.vue'),
    Pager
  },
  methods: {
    validateAccount(item){
      let parameter = {
        id: item.id,
        status: 'VERIFIED'
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('accounts/update_verification', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
      })
    },
    validateMerchant(item){
      let parameter = {
        account_id: item.id,
        status: 'verified'
      }
      // $('#loading').css({display: 'block'})
      this.APIRequest('merchants/update_by_verification', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
      })
    },
    hideModal(id){
      this.selectedItem = null
      this.selectedLocation = null
      $(id).modal('hide')
    },
    showAddressModal(item){
      this.selectedItem = item
      this.location = null
      this.locationMessage = null
      this.retrieveLocation(item)
    },
    manageLocation(location){
      this.location = location
    },
    submitLocation(){
      let parameter = null
      let route = null
      if(this.selectedItem === null){
        return
      }
      if(this.selectedItem.account_type === 'RIDER'){
        if(this.selectedLocation === null){
          parameter = {
            ...this.location,
            account_id: this.selectedItem.id,
            code: this.scopeLocation
          }
          route = 'locations/create'
        }else{
          parameter = {
            id: this.selectedLocation.id,
            code: this.scopeLocation
          }
          route = 'locations/update'
        }
      }else{
        if(this.selectedLocation === null){
          parameter = {
            ...this.location,
            account_id: this.selectedItem.id,
            merchant_id: this.selectedItem.merchant.id,
            code: this.scopeLocation
          }
          route = 'locations/create'
        }else{
          parameter = {
            id: this.selectedLocation.id,
            code: this.scopeLocation
          }
          route = 'locations/update'
        }
      }
      this.APIRequest(route, parameter).then(response => {
        if(response.data){
          this.locationMessage = 'Successfully updated!'
        }else{
          this.locationMessage = 'Error update!'
        }
      })
    },
    retrieveLocation(item){
      let parameter = null
      if(item.account_type === 'RIDER'){
        parameter = {
          condition: [{
            value: item.id,
            column: 'account_id',
            clause: '='
          }]
        }
      }else{
        // merchant id here
        parameter = {
          condition: [{
            value: item.id,
            column: 'account_id',
            clause: '='
          }]
        }
      }
      // $('#loading').css({display: 'block'})
      this.APIRequest('locations/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.selectedLocation = response.data[0]
          this.scopeLocation = response.data[0].code
        }else{
          this.scopeLocation = null
          this.selectedLocation = null
        }
        $('#addAddressAccount').modal('show')
      })
    },
    setEditTypeIndex(index, item){
      if(index === this.editTypeIndex){
        this.editTypeIndex = null
        this.newAccountType = null
      }else{
        this.selectedAccount = item
        this.editTypeIndex = index
        this.newAccountType = item.account_type
      }
    },
    updateType(item, index){
      if(this.newAccountType === null || this.newAccountType === item.account_type){
        this.setEditTypeIndex(index, item)
        return
      }
      let parameter = {
        id: item.id,
        account_type: this.newAccountType
      }
      // $('#loading').css({display: 'block'})
      this.APIRequest('accounts/update_account_type', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.setEditTypeIndex(index, item)
        // this.retrieve(null, null)
        $('#loading').css({display: 'block'})
        this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
      })
    },
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort, filter){
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let parameter = {
        condition: [{
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }],
        sort: sort,
        limit: this.limit,
        offset: (this.activePage > 0) ? this.activePage - 1 : this.activePage
      }
      this.APIRequest('accounts/retrieve_accounts', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
        }else{
          this.data = null
          this.numPages = null
        }
      })
    },
    update(item){
      if(item.status !== 'NOT_VERIFIED'){
        let parameter = {
          id: item.id,
          status: 'GRANTED'
        }
        // $('#loading').css({display: 'block'})
        this.APIRequest('accounts/update_verification', parameter).then(response => {
          $('#loading').css({display: 'none'})
          this.retrieve(null, null)
        })
      }else{
        alert('Not Allowed!')
      }
    }
  }
}
</script>
