Ext.define('Grubm.model.Business', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'name',
    type: 'string'
  },{
    name: 'city',
    type: 'string'
  },{
    name: 'street',
    type: 'string'
  },{
    name: 'state',
    type: 'string'
  },{
    name: 'zip',
    type: 'string'
  }]
});