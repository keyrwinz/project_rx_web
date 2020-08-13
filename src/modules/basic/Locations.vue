<template>
  <div class="locations">
    <div class="header row justify-content-between align-items-center">
      <span class="ml-2 title">Locations</span>
      <button class="btn btn-success" type="button" data-toggle="modal" data-target="#newLocation"> <span class="fa fa-plus mr-2"></span> Add Location</button>
    </div>
    <span class="content">
      <empty-dynamic v-if="data === null" :title="'No Locations'" :action="'Add the location of your branches'" :icon="'fa fa-building'" :iconColor="'text-danger'"></empty-dynamic>
      <table v-else class="table table-striped table-bordered mt-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Branch Name</th>
            <th scope="col">Locality</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" v-bind:key="index">
            <td>{{item.route}}</td>
            <td>{{item.locality}}, {{item.region}}</td>
            <td class="text-center">
              <button class="btn btn-success" @click="selectedBranch = item, show()" type="button"><i class="fa fa-edit"></i></button>
              <button class="btn btn-danger" @click="selectedBranch = item" type="button" data-toggle="modal" data-target="#delete"><i class="fa fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </span>

    <!--MODAL FOR ADDING LOCATION-->
    <div class="modal fade right" id="newLocation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
      <div class="modal-dialog modal-side modal-notify modal-primary modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Branch</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="selectedBranch = null">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <div class="form-group mb-5">
              <label for="code">Branch Name</label>
              <input type="text" name="branch" id="branch" class="form-control" placeholder="Enter Branch Name">
            </div>
            <div v-if="customLocation === false">
              <div class="row mb-3 justify-content-end mx-0">
                <button class="btn btn-primary" @click="customLocation = true">Use Custom Location</button>
              </div>
              <div class="form-group">
                <label for="location">Set Address</label>
                <google-autocomplete-location
                  :property="googleProperty"
                  :id="'location'"
                  ref="location"
                  @onFinish="getLocation($event)"
                >
                </google-autocomplete-location>
              </div>
            </div>
            <div v-if="customLocation === true">
              <div class="row mb-3 justify-content-end mx-0">
                <button class="btn btn-primary" @click="customLocation = false">Use Google Autocomplete</button>
              </div>
              <div class="row mb-3">
                <div class="col font-weight-bold">Please move the red pin first.</div>
                <div class="col">
                  <span class="text-danger font-weight-bold">Pin Location</span><br> Pins your current location.
                </div>
                <div class="col">
                  <span class="text-primary font-weight-bold">Use Location</span> <br>Selects the location of the pin to use.
                </div>
              </div>
              <pin-location @onSelect="getLocation($event)" :property="{
                height: '400px'
              }"></pin-location>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" data-dismiss="modal" @click="selectedBranch = null">Cancel</button>
            <button class="btn btn-success" @click="selectedItem ? update() : addNew()">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE BRANCH MODAL -->
    <div class="modal fade right" id="delete" tabindex="-1" role="dialog" aria-labelledby="deleteHeader"
     aria-hidden="true">
      <div class="modal-dialog modal-side modal-notify modal-primary" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteheader">Delete Branch</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="selectedBranch = null">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            Are you sure you want to delete this branch?
          </div>
          <div class="modal-footer">
            <button class="btn btn-dark" data-dismiss="modal" @click="selectedBranch = null">Cancel</button>
            <button class="btn btn-secondary" data-dismiss="modal" @click="deleteBranch()">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT BRANCH MODAL -->
    <div class="modal fade right" id="edit" tabindex="-1" role="dialog" aria-labelledby="editHeader"
     aria-hidden="true">
      <div class="modal-dialog modal-side modal-notify modal-primary" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editheader">Rename Branch</h5>
            <button type="button" class="close" aria-label="Close" @click="hide()">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <div class="form-group">
              <label for="branchName" class="font-weight-bold">New Branch Name</label>
              <input type="text" name="branchName" id="branchName" class="form-control" :class="[{'is-invalid': editFlag}]">
              <div class="invalid-feedback">Name is required!</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-dark" @click="hide()">Cancel</button>
            <button class="btn btn-success" @click="editBranch()">Rename</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "~assets/style/colors.scss";
  .locations {
    width: 95%;
    float: left;
    margin-left: 5%;
    margin-bottom: 200px;
  }

  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #ddd;
    float: left;
  }

  .header .title {
    font-size: 24px;
  }

  .content{
    width: 100%;
    min-height: 50px;
    margin-left: -2%;
    float: left;
    overflow-y: hidden;
  }

  .table .thead-dark th {
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
  }

  .table td {
    vertical-align: middle;
  }

  .table td:first-child {
    width: 30%;
  }

  .table td:last-child {
    width: 15%;
  }

  td i.fa {
    padding-right: 0
  }

  td i.fa:hover {
    color: white !important;
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  mounted(){
    this.retrieve()
  },
  data() {
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null,
      location: null,
      editFlag: false,
      selectedBranch: null,
      customLocation: false,
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
      }
    }
  },
  components: {
    'google-autocomplete-location': require('src/components/increment/generic/location/GooglePlacesAutoComplete.vue'),
    'pin-location': require('modules/basic/PinLocation.vue'),
    'empty-dynamic': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    retrieve() {
      let par = {
        condition: [{
          value: this.user.userID,
          clause: '=',
          column: 'account_id'
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('locations/retrieve', par).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0) {
          this.data = response.data
        } else {
          this.data = null
        }
      })
    },
    getLocation(event) {

      let location = {
        locality: event.locality,
        region: event.region,
        country: event.country,
        latitude: event.latitude,
        longitude: event.longitude
      }
      this.location = location
    },
    show() {
      $('#edit').modal('show')
    },
    hide() {
      $('#edit').modal('hide')
      this.selectedBranch = null
      this.editFlag = false
    },
    addNew() {
      let branchName = $('#branch').val()
      let error = false
      $('#newLocation .error-msg').remove()
      if(this.location === null) {
        $('<div>', {
          class: 'form-group text-danger error-msg',
          html: '<b>Uh oh!</b> Location is required.'
        }).prependTo('#newLocation .modal-body')

        error = true
      }

      if(branchName === null || branchName === '') {
        $('<div>', {
          class: 'form-group text-danger error-msg',
          html: '<b>Uh oh!</b> Branch name is required.'
        }).prependTo('#newLocation .modal-body')

        error = true
      }

      if(!error) {
        this.location.route = branchName
        let par = this.location
        par.autogenerate = true
        par.account_id = this.user.userID

        $('#loading').css({display: 'block'})
        this.APIRequest('locations/create', par).then(response => {
          this.location = null
          $('#branch').val('')
          this.retrieve()
          this.hideModal()
        })
      }
    },
    editBranch() {
      this.editFlag = false
      if(this.selectedBranch !== null) {
        let newName = $('#branchName').val()
        if(newName === '' || !newName) {
          this.editFlag = true
        } else {
          let par = {
            id: this.selectedBranch.id,
            route: newName
          }
          $('#loading').css({display: 'block'})
          this.APIRequest('locations/update', par).then(response => {
            $('#loading').css({display: 'none'})
            this.hide()
            this.retrieve()
          })
        }
      }
    },
    deleteBranch() {
      if(this.selectedBranch !== null) {
        let par = {
          id: this.selectedBranch.id
        }

        $('#loading').css({display: 'block'})
        this.APIRequest('locations/delete', par).then(response => {
          $('#loading').css({display: 'none'})
          this.selectedBranch = null
          this.retrieve()
        })
      }
    }
  }
}
</script>
