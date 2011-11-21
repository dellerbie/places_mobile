Ext.define('Grubm.controller.Images', {
  extend: 'Ext.app.Controller',
  views: ['Main'],
  stores: ['Cities', 'Images', 'Businesses'],
  refs: [{
    ref     : 'main',
    selector: 'mainview',
    autoCreate: true,
    xtype   : 'mainview'
  }],
  init: function() {
    this.getMainView().create();
  }
});