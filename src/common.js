export default {
  sidebarMenu: [
    {accountType: 'MERCHANT', accountStatus: 'ALL', showOnAdmin: false, description: 'Dashboard', icon: 'fa fa-tachometer-alt', path: 'dashboard', flag: false, subMenu: null},
    {accountType: 'RIDER', accountStatus: 'ALL', showOnAdmin: true, description: 'Dashboard', icon: 'fa fa-tachometer-alt', path: 'dashboard', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'Featured', icon: 'fa fa-tachometer-alt', path: 'featured', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', showOnAdmin: true, description: 'Marketplace', icon: 'fa fa-tachometer-alt', path: 'marketplace', flag: false, subMenu: null},
    // {accountType: 'MERCHANT', accountStatus: 'ALL', showOnAdmin: true, description: 'My Product', icon: 'fa fa-tachometer-alt', path: 'products', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ALL', showOnAdmin: true, description: 'Account', icon: 'fa fa-tachometer-alt', path: 'accounts', flag: false, subMenu: null}
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
  merchantMenu: [{
    title: 'Inventory',
    icon: 'fa fa-boxes',
    route: '/products'
  }, {
    title: 'Wallet',
    icon: 'fa fa-wallet',
    route: '/wallet'
  }, {
    title: 'Ledger',
    icon: 'fa fa-clipboard-list',
    route: '/ledger'
  }, {
    title: 'Summary of Orders',
    icon: 'fa fa-shopping-bag',
    route: '/orders'
  }],
  APP_NAME: 'RunwayExpress',
  APP_NAME_HTML: 'Runway Express',
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
    {title: 'Notifications', hideFrom: [], type: 'notification', allowed: []},
    {title: 'Business Locations', hideFrom: ['USER', 'RIDER'], type: 'merchant_locations', allowed: []},
    {title: 'Account', hideFrom: [], type: 'account', allowed: []},
    {title: 'Billing Information', hideFrom: [], type: 'billing_information'}
  ],
  notificationSeting: [{
    title: 'OTP',
    flag: true
  }, {
    title: 'SMS',
    flag: true
  }, {
    title: 'EMAIL',
    flag: true
  }],
  referral: {
    message: 'to get deals on selected items!',
    emailMessage: ', a brand new food delivery app. Check out their awesome deals!',
    promotion: ''
  },
  socialMedia: {
    facebook: 'runwayexpress'
  },
  pusher: {
    channel: 'runway',
    private: 'runway_broadcast',
    notifications: 'Notifications',
    rider: 'Rider',
    messages: 'Message',
    validation: 'Validation',
    orders: 'Orders'
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
