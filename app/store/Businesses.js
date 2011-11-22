Ext.define('Grubm.store.Businesses', {
  extend: 'Ext.data.Store',
  fields:['business', 'images'],
  proxy: {
    type: 'jsonp',
    url: 'http://192.168.1.71:3000/business/.json'
  },
  autoload: false
});