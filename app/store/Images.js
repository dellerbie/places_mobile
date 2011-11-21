Ext.define('Grubm.store.Images', {
  extend  : 'Ext.data.Store',
  model   : 'Grubm.model.Image',
  requires: ['Grubm.model.Image'],
  proxy: {
    type: 'ajax',
    url: 'http://localhost:3000/.json',
    reader: {
      type: 'json'
    }
  },
  autoLoad: true
});