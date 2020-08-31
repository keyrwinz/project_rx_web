import countries from 'src/countries.js'
let country = countries.list.map((item, index) => {
  return {
    label: item.title,
    value: item.title
  }
})
export default {
  id: 'scopeLocatioModal',
  size: 'modal-md',
  title: 'Add Location Code',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Scope',
    variable: 'code',
    placeholder: 'Scope',
    value: null,
    required: true,
    id: 'code',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Route',
    variable: 'route',
    placeholder: 'Route',
    value: null,
    required: true,
    id: 'route',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'City',
    variable: 'city',
    placeholder: 'City',
    value: null,
    required: false,
    id: 'city',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Region',
    variable: 'region',
    placeholder: 'Region',
    value: null,
    required: false,
    id: 'region',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Country',
    variable: 'country',
    placeholder: 'Country',
    value: null,
    required: false,
    id: 'country',
    type: 'select_specified',
    options: country,
    validation: {
      size: 1,
      type: 'text'
    }
  }],
  route: 'location_scopes/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: []
}
