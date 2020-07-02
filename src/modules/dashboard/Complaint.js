export default {
  id: 'createComplaint',
  size: 'modal-md',
  title: 'Feedback Form',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Feedback',
    variable: 'message',
    placeholder: 'What is your feedback?',
    value: null,
    required: true,
    id: 'feedback',
    type: 'textarea',
    inputType: 'text',
    validation: {
      size: 5,
      type: 'text'
    }
  }],
  route: 'complaints/create',
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
