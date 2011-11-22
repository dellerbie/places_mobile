Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'imagesview',
  requires: ['Ext.plugins.ListPagingPlugin'],
  config: {
    ui: 'images-view',
    store: 'Images',
    itemTpl: new Ext.XTemplate(
      '<img src="{url}" />',
      '<div>',
        '<span class="what">{description}</span>',
        '<span class="at">@</span>',
        '<tpl for="business">',
          '<span class="place">{name}</span>, ',
          '<span class="city">{city}</span>',
        '</tpl>',
      '</div>'
    ),
    emptyText: "No images to show.  Try a different search.",
    plugins: [{
      ptype: 'listpaging',
      autoPaging: false
    }]
  }
});