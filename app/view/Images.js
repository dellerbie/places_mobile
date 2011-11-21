Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'images',
  config: {
    ui: 'images-view',
    store: 'Images',
    itemTpl: new Ext.XTemplate(
      '<img src="{url}" />',
      '<div>',
        '<span class="what">{description}</span>',
        '<span class="at">@</span>',
        '<tpl for="business">',
          '<a href="#" class="place">{name}</a>, ',
          '<span class="city">{city}</span>',
        '</tpl>',
      '</div>'
    ),
    emptyText: "No images to show.  Sorry dog."
  }
});