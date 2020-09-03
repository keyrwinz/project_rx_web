import countries from 'src/countries.js'
let currency = countries.list.map((item, index) => {
  return {
    label: item.currency,
    value: item.currency
  }
})
export default {
  id: 'fundtransferFeeModal',
  size: 'modal-md',
  title: 'Add Fund Transfer Fee',
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
    label: 'Destination',
    variable: 'destination',
    placeholder: 'Destination',
    value: null,
    required: true,
    id: 'destination',
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
    label: 'Minimum Amount',
    variable: 'minimum_amount',
    placeholder: 'Minimum Amount',
    value: null,
    required: true,
    id: 'minimum_amount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Maximum Amount',
    variable: 'maximum_amount',
    placeholder: 'Maximum Amount',
    value: null,
    required: true,
    id: 'maximum_amount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Charge',
    variable: 'charge',
    placeholder: 'Charge',
    value: null,
    required: true,
    id: 'charge',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }],
  route: 'fund_transfer_charges/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: []
}
