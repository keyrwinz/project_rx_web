<template>
  <div class="ledger-summary-container">
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      />
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead class="bg-primary">
        <tr>
          <td>Date</td>
          <td>Username</td>
          <td>Email</td>
          <td>Type</td>
          <td>Status</td>
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
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="addAddressAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Assign Address</h5>
            <button type="button" class="close" @click="hideModal()" aria-label="Close">
              <span aria-hidden="true" class="text-primary">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group" v-if="errorMessage !== null">
              <label class="text-danger"><b>Oops!</b> {{errorMessage}}</label>
            </div>
            <div class="form-group">
              <label>Brgy Code</label>
              <input type="text" class="form-control form-control-custom" v-model="brgyCode" placeholder="Type brgy code">
            </div>
            <div class="form-group">
              <button class="btn btn-primary" v-if="locationFlag === 'autocomplete'" @click="locationFlag = 'custom'">Use custom</button>
              <button class="btn btn-primary" v-if="locationFlag === 'custom'" @click="locationFlag = 'autocomplete'">Use autocomplete</button>
            </div>
            <div v-if="locationFlag === 'autocomplete'">
              <label>Search location</label>
              <google-autocomplete-location
                :property="googleProperty"
                ref="location"
                @onFinish="manageLocation($event)">
                </google-autocomplete-location>
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Latitude</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.latitude" placeholder="Type latitude">
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Longitude</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.longitude" placeholder="Type longitude">
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Route</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.route" placeholder="Type route">
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Locality</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.locality" placeholder="Type locality">
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Region</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.region" placeholder="Type region">
            </div>
            <div class="form-group" v-if="locationFlag === 'custom'">
              <label>Country</label>
              <input type="text" class="form-control form-control-custom" v-model="customLocation.country" placeholder="Type country">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
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
      ROUTER.push('/dashboard')
    }
    $('#loading').css({display: 'block'})
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
          payload: 'status',
          payload_value: 'asc'
        }, {
          title: 'Type descending',
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
      limit: 10,
      activePage: 1,
      numPages: null,
      selectedItem: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue')
  },
  methods: {
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
      $('#loading').css({display: 'block'})
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
        $('#loading').css({display: 'block'})
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
