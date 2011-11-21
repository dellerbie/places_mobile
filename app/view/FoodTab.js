Ext.define('Grubm.view.FoodTab', {
  extend: 'Ext.Container',
  xtype: 'food',
  requires: [
    'Grubm.view.SearchBar',
    'Grubm.view.Images'
  ],
  config: {
    layout: 'hbox',
    items: [{
      docked: 'top',
      xtype: 'searchbar'
    },{
      xtype: 'images',
      flex: 1
    }]
  }
});