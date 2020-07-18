export default {
  id: 'newLocation',
  size: 'modal-md',
  title: 'Add New Branch Location',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Branch Name',
    variable: 'route',
    placeholder: 'Enter Branch Name',
    value: null,
    required: true,
    id: 'route',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 5,
      type: 'text'
    }
  }],
  route: 'locations/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: [{
    variable: 'status',
    value: 'pending'
  }]
}
