Ext.define('Grubm.view.CityPickerTab', {
  extend: 'Ext.dataview.List',
  xtype: 'citypicker',
  config: {
    ui: 'citypicker',
    store: 'Cities',
    itemTpl: '{name}'
  }
});