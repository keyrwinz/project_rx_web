export default {
  sidebarMenu: [
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'My Visited Places', icon: 'fa fa-map-marker', path: 'places', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'My Temperature', icon: 'fa fa-thermometer-half', path: 'temperature/p', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'My Rides', icon: 'fa fa-car', path: 'rides/p', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'Symptoms Reporting', icon: 'fas fa-diagnoses', path: 'symptoms_reporting', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ALL', showOnAdmin: true, description: 'Places', icon: 'fa fa-map', path: 'all-places', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ALL', showOnAdmin: true, description: 'Rides', icon: 'fa fa-truck', path: 'all-rides', flag: false, subMenu: null},
    {accountType: 'AGENCY_DOH', accountStatus: 'ALL', showOnAdmin: true, description: 'Patients', icon: 'fa fa-users', path: 'patients', flag: false, subMenu: null},
    {accountType: 'AGENCY_DOH', accountStatus: 'ALL', showOnAdmin: true, description: 'Tracing', icon: 'fa fa-sitemap', path: 'tracing', flag: false, subMenu: null},
    {accountType: 'AGENCY_GOV', accountStatus: 'ALL', showOnAdmin: false, description: 'Patients', icon: 'fa fa-users', path: 'patients', flag: false, subMenu: null},
    {accountType: 'AGENCY_GOV', accountStatus: 'ALL', showOnAdmin: false, description: 'Tracing', icon: 'fa fa-sitemap', path: 'tracing', flag: false, subMenu: null},
    {accountType: 'BUSINESS', accountStatus: 'ALL', showOnAdmin: true, description: 'Contract Tracing', icon: 'fa fa-sitemap', path: 'b/tracing/', flag: false, subMenu: null},
    {accountType: 'BUSINESS', accountStatus: 'ALL', showOnAdmin: true, description: 'Branch/Location', icon: 'fa fa-sitemap', path: 'b/location/', flag: false, subMenu: null},
    {accountType: 'BUSINESS', accountStatus: 'ALL', showOnAdmin: true, description: 'Business Settings', icon: 'fa fa-sitemap', path: 'business_settings', flag: false, subMenu: null},
    {accountType: 'AGENCY_GOV', accountStatus: 'ALL', showOnAdmin: false, description: 'Temperature Summary', icon: 'fa fa-chart-line', path: 'temperature', flag: false, subMenu: null},
    {accountType: 'AGENCY_BRGY', accountStatus: 'ALL', showOnAdmin: true, description: 'Accounts', icon: 'fa fa-users', path: 'accounts', flag: false, subMenu: null},
    {accountType: 'AGENCY_BRGY', accountStatus: 'ALL', showOnAdmin: false, description: 'Feedback', icon: 'fa fa-comment', path: 'feedback', flag: false, subMenu: null},
    {accountType: 'AGENCY_BRGY', accountStatus: 'ALL', showOnAdmin: false, description: 'Branch/Location', icon: 'fa fa-sitemap', path: 'b/location/', flag: false, subMenu: null},
    {accountType: 'AGENCY_BRGY', accountStatus: 'ALL', showOnAdmin: false, description: 'Patients', icon: 'fa fa-comment', path: 'b/patients', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ALL', showOnAdmin: true, description: 'Accounts', icon: 'fa fa-users', path: 'admin/accounts', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ALL', showOnAdmin: true, description: 'Barangays', icon: 'fa fa-building', path: 'admin/barangays', flag: false, subMenu: null}
  ],
  profileMenu: [{
    title: 'My Profile',
    icon: 'fa fa-cog',
    route: '/profile'
  }, {
    title: 'Linked Accounts',
    icon: 'fa fa-users',
    route: '/linked_accounts'
  }, {
    title: 'Invite Friends',
    icon: 'fa fa-users',
    route: '/referrals'
  }],
  implementedLocality: 'Cebu City, Consolacion, Mandaue City, Minglanilla, Lapu-Lapu City, Liloan, Talisay Cebu',
  APP_NAME: 'BirdsEye',
  APP_NAME_HTML: 'BirdsEye',
  APP_EMAIL: 'support@birds-eye.org',
  COMPANY: 'BirdsEye',
  COMPANY_URL: 'https://birds-eye.org',
  APP_URL: 'https://birds-eye.org',
  COPYRIGHT: 'BirdsEye ' + new Date().getFullYear(),
  USER_TYPE: [{
    title: 'USER'
  }, {
    title: 'AGENCY'
  }],
  plan: false,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', type: 'profile', allowed: ['cellular_number', 'address', 'sex', 'birth_date']},
    {title: 'Account', type: 'account', allowed: []}
  ],
  referral: {
    message: 'and let\'s be one in fighting COVID-19. ',
    emailMessage: '.They can trace and have an birdseye view for COVID-19. Let\'s spread the good news!'
  },
  socialMedia: {
    facebook: 'birdseyeph'
  },
  pusher: {
    channel: 'birdseye',
    notifications: 'Notifications',
    messages: 'Message',
    validation: 'Validation'
  },
  vehicleTypes: [{
    label: 'Bus',
    value: 'bus'
  }, {
    label: 'Plane',
    value: 'plane'
  }, {
    label: 'Jeepney',
    value: 'jeep'
  }, {
    label: 'Private Car',
    value: 'private_car'
  }, {
    label: 'Motorcycle',
    value: 'motorcycle'
  }, {
    label: 'Shippings',
    value: 'shppings'
  }, {
    label: 'Train',
    value: 'train'
  }, {
    label: 'Van',
    value: 'van'
  }, {
    label: 'Others',
    value: 'others'
  }],
  symptoms: [{
    label: 'Fever',
    value: 'fever'
  }, {
    label: 'LBM',
    value: 'lbm'
  }, {
    label: 'Cough and Colds',
    value: 'cough and colds'
  }, {
    label: 'Sore Throat',
    value: 'sore throat'
  }, {
    label: 'Others',
    value: 'others'
  }],
  healthDec: {
    personalInformation: {
      first_name: null,
      last_name: null,
      middle_name: null,
      gender: null,
      birth_date: null,
      civil_status: null,
      occupation: null,
      contact_number: null,
      email: null,
      address: null
    },
    travelHistory: {
      transportation: [],
      countries: [],
      localities: []
    },
    symptoms: [],
    safety_questions: []
  },
  broadcastingFlag: true,
  passwordLimit: 8,
  alertFlag: false
}
