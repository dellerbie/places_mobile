Ext.define('Grubm.store.Images', {
  extend  : 'Ext.data.Store',
  model   : 'Grubm.model.Image',
  requires: ['Grubm.model.Image'],
  proxy: {
    type: 'jsonp',
    url: 'http://192.168.1.71:3000/.json'
  },
  autoLoad: false
});