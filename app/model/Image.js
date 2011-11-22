Ext.define('Grubm.model.Image', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'url', 
    type: 'string'
  },{
    name: 'description',
    type: 'string'
  },{
    name: 'business'
  }],
  hasOne: { model: 'Grubm.model.Business', name: 'business' }
});