Ext.define('Grubm.view.Main', {
  extend: 'Ext.TabPanel',
  requires: [
    'Grubm.view.CityPickerTab',
    'Grubm.view.FoodTab',
    'Grubm.view.Business'
  ],
  
  config: {
    fullscreen: true,
    tabBarPosition: 'bottom',
    items: [{
      xtype: 'citypicker',
      title: 'Cities',
      iconCls: 'home'
    },{
      xtype: 'food',
      title: 'Food',
      iconCls: 'user'
    },{
      xtype: 'businessview',
      title: 'Details',
      iconCls: 'user'
    }]
  }
});