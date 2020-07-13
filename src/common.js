export default {
  sidebarMenu: [
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'Featured', icon: 'fa fa-tachometer', path: 'marketplace', flag: false, subMenu: null},
    {accountType: 'MERCHANT', accountStatus: 'ALL', showOnAdmin: true, description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'My Product', icon: 'fa fa-tachometer', path: 'products', flag: false, subMenu: null}
  ],
  profileMenu: [{
    title: 'My Profile',
    icon: 'fa fa-cog',
    route: '/profile'
  }, {
    title: 'Invite Friends',
    icon: 'fa fa-users',
    route: '/referrals'
  }],
  APP_NAME: 'RunwayExpress',
  APP_NAME_HTML: 'RunwayExpress',
  APP_EMAIL: 'support@runwayexpress.com',
  COMPANY: 'RunwayExpress',
  COMPANY_URL: 'https://runwayexpress.com',
  APP_URL: 'https://runwayexpress.com',
  COPYRIGHT: 'RunwayExpress ' + new Date().getFullYear(),
  USER_TYPE: [{
    title: 'USER'
  }, {
    title: 'MERCHANT'
  }, {
    title: 'RIDER'
  }, {
    title: 'ADMIN'
  }],
  plan: false,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', hideFrom: ['MERCHANT'], type: 'profile', allowed: ['cellular_number', 'address', 'sex', 'birth_date']},
    {title: 'Business Information', hideFrom: ['USER', 'RIDER'], type: 'merchant', allowed: ['email', 'prefix', 'website']},
    {title: 'Business Locations', hideFrom: ['USER', 'RIDER'], type: 'merchant_locations', allowed: []},
    {title: 'Account', hideFrom: [], type: 'account', allowed: []},
    {title: 'Billing Information', hideFrom: [], type: 'billing_information'}
  ],
  referral: {
    message: 'this is a test. ',
    emailMessage: '.This is a test.'
  },
  socialMedia: {
    facebook: 'runwayexpress'
  },
  pusher: {
    channel: 'runwayexpress',
    notifications: 'Notifications',
    messages: 'Message',
    validation: 'Validation'
  },
  ecommerce: {
    inventoryType: 'inventory',
    editProductMenu: [{
      title: 'Inventory',
      flag: true
    }, {
      title: 'Variation',
      flag: false
    }, {
      title: 'Price',
      flag: false
    }, {
      title: 'Comment',
      flag: false
    }, {
      title: 'Location',
      flag: false
    }],
    editProductMenuRental: [{
      title: 'Inventory',
      flag: true
    }, {
      title: 'Variation',
      flag: false
    }, {
      title: 'Price',
      flag: false
    }, {
      title: 'Comment',
      flag: false
    }, {
      title: 'Location',
      flag: false
    }],
    productUnits: null,
    productTitleLimit: 100,
    variations: ['Size', 'Color']
  },
  broadcastingFlag: true,
  passwordLimit: 8,
  alertFlag: false
}
