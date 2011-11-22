Ext.define('Grubm.view.SearchBar', {
  extend: 'Ext.Toolbar',
  xtype: 'searchbar',
  config: {
    defaults: {
      iconMask: true
    },
    items: [{
      ui: 'back',
      text: 'Back'
    },{ 
      xtype: 'textfield', 
      name: 'q' 
    },{ 
      iconCls: 'search' 
    }]
  }
});