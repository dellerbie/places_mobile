Ext.define('Grubm.view.Business', {
  extend: 'Ext.dataview.DataView',
  xtype: 'businessview',
  requires: 'Grubm.store.Businesses',
  config: {
    ui: 'business',
    store: 'Businesses',
    itemTpl: new Ext.XTemplate(
      '<tpl for="business">',
        '<div class="business-wrapper">',
          '<span class="place">{name}</span>',
          '<span class="street">{street}</span>',
          '<span class="city-state-zip">{city}, {state} {zip}</span>',
          '<a class="map" href="http://maps.google.com/maps?q=8432+W+3rd+St+Los+Angeles+CA+90048">map</a>',
        '</div>',
        '<h3>More Photos from {name}</h3>',
      '</tpl>',
      '<tpl for="images">',
        '<img src="{url}" />',
        '<span class="what">{description}</span>',
      '</tpl>'
    )
  }
});