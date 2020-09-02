import countries from 'src/countries.js'
let currency = countries.list.map((item, index) => {
  return {
    label: item.currency,
    value: item.currency
  }
})
export default {
  id: 'deliveryFeeModal',
  size: 'modal-md',
  title: 'Add Delivery Fee',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Effective Date',
    variable: 'effective_date',
    placeholder: 'Effective Date',
    value: null,
    required: true,
    id: 'effective_date',
    type: 'PastDateLimit',
    inputType: 'date',
    validation: {
      size: 1,
      type: 'date'
    }
  }, {
    row: 'full',
    label: 'Scope',
    variable: 'scope',
    placeholder: 'Scope',
    value: null,
    required: true,
    id: 'scope',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Currency',
    variable: 'currency',
    placeholder: 'Currency',
    value: 'PHP',
    required: true,
    id: 'currency',
    type: 'select_specified',
    options: currency,
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Minimum Charge',
    variable: 'minimum_charge',
    placeholder: 'Minimum Charge',
    value: null,
    required: true,
    id: 'minimum_charge',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Minimum Distance',
    variable: 'minimum_distance',
    placeholder: 'Minimum Distance in km',
    value: null,
    required: true,
    id: 'minimum_distance',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Additional charge per km',
    variable: 'addition_charge_per_distance',
    placeholder: 'Additional charge per km',
    value: null,
    required: true,
    id: 'addition_charge_per_distance',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }],
  route: 'delivery_fees/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: []
}
