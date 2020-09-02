export default {
  id: 'promosModal',
  size: 'modal-md',
  title: 'Add Promo',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Code',
    variable: 'code',
    placeholder: 'enter code',
    value: 'null',
    required: true,
    id: 'code',
    type: 'input',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Description',
    variable: 'description',
    placeholder: 'description',
    value: 'null',
    required: true,
    id: 'description',
    type: 'textarea',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Type',
    variable: 'type',
    placeholder: 'type',
    value: 'null',
    required: true,
    id: 'type',
    type: 'select_specified',
    options: [{
      label: 'fixed',
      value: 'fixed'
    }, {
      label: 'percentage',
      value: 'percentage'
    }],
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Value',
    variable: 'value',
    placeholder: 'value',
    value: null,
    required: true,
    id: 'value',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 0,
      type: 'number'
    }
  }, {
    row: 'full',
    label: 'From date',
    variable: 'start',
    placeholder: 'enter the starting date',
    value: null,
    required: true,
    id: 'start',
    type: 'date',
    inputType: 'string',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'End date',
    variable: 'end',
    placeholder: 'enter the end date',
    value: null,
    required: true,
    id: 'end',
    type: 'date',
    inputType: 'string',
    validation: {
      size: 1,
      type: 'text'
    }
  },
  {
    variable: 'account_id'
  }],
  route: 'coupons/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: []
}
