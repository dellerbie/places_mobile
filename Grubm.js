Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'Grubm',
    controllers: ['Images'],
    models: ['City']
    // launch: function() {
      
      // Ext.define('Grubm.model.Business', {
      //   extend: 'Ext.data.Model',
      //   fields: [{
      //     name: 'name',
      //     type: 'string'
      //   },{
      //     name: 'city',
      //     type: 'string'
      //   },{
      //     name: 'street',
      //     type: 'string'
      //   },{
      //     name: 'state',
      //     type: 'string'
      //   },{
      //     name: 'zip',
      //     type: 'string'
      //   }]
      // });
      // 
      // Ext.define('Grubm.model.Image', {
      //   extend: 'Ext.data.Model',
      //   fields: [{
      //     name: 'url', 
      //     type: 'string'
      //   },{
      //     name: 'description',
      //     type: 'string'
      //   },{
      //     name: 'city',
      //     type: 'string'
      //   },{
      //     name: 'business'
      //   }],
      //   hasOne: 'Grubm.model.Business'
      // });
      
      // Ext.create('Ext.TabPanel', {
      //         fullscreen: true,
      //         tabBarPosition: 'bottom',
      //         items: [{
      //           xtype: 'list',
      //           title: 'Cities',
      //           iconCls: 'home',
      //           store: {
      //             model: 'City',
      //             data: [
      //              {name: 'Los Angeles'},
      //              {name: 'New York City'},
      //              {name: 'Philadelphia'},
      //              {name: 'San Francisco'}
      //             ]
      //           },
      //           itemTpl: '{name}'
      //         },{
      //           xtype: 'container',
      //           title: 'Food',
      //           iconCls: 'user',
      //           layout: 'hbox',
      //           items: [{
      //             docked: 'top',
      //             xtype: 'toolbar',
      //             defaults: {
      //               iconMask: true
      //             },
      //             items: [
      //               { xtype: 'textfield', name: 'q' },
      //               { iconCls: 'search' }
      //             ]
      //           },{
      //             xtype: 'dataview',
      //             flex: 1,
      //             baseCls: 'images-view',
      //             store: {
      //               model: 'Image',
      //               proxy: {
      //                 type: 'ajax',
      //                 url: 'http://localhost:3000/.json',
      //                 reader: {
      //                   type: 'json'
      //                 }
      //               },
      //               autoLoad: true
      //               // data: [
      //               //  {url: 'http://s3.amazonaws.com/dellerbie-places-food-images/662c1bad51b35fc071e46c651686be7c6569502c_lg.jpg', description: 'Waldorf Salad and Bar Fries - Delicious!', business: { name: 'Spudnicks', city: 'Culver City'}},
      //               //  {url: 'http://s3.amazonaws.com/dellerbie-places-food-images/16b08904e7a10f6a815290220640aa66c86ece1e_lg.jpg', description: 'Pepperoni, mushroom and fresh basil. They sprinkle…', business: {name: 'The Coop Pizza', city: 'Los Angeles'}},
      //               //  {url: 'http://s3.amazonaws.com/dellerbie-places-food-images/2582565f2fd08a328756c5fce83ea7cd83809dea_lg.jpg', description: 'Trust the cook ($7.95)', business: {name: 'Pasadena Sandwich Company', city: 'Pasadena'}},
      //               //  {url: 'http://s3.amazonaws.com/dellerbie-places-food-images/2a3f3d6b2fdffbbdbcedfbda89a91423fb1eac2a_lg.jpg', description: 'Lasagna', business: {name: 'Allora Cucina Italiana', city: 'Los Angeles'}}
      //               // ]
      //             },
      //             itemTpl: new Ext.XTemplate(
      //               '<img src="{url}" />',
      //               '<div>',
      //                 '<span class="what">{description}</span>',
      //                 '<span class="at">@</span>',
      //                 '<tpl for="business">',
      //                   '<a href="#" class="place">{name}</a>, ',
      //                   '<span class="city">{city}</span>',
      //                 '</tpl>',
      //               '</div>'
      //             ),
      //             emptyText: "No images to show.  Sorry dog."
      //           }]
      //         },{
      //           xtype: 'dataview',
      //           title: 'Details',
      //           iconCls: 'user',
      //           baseCls: 'details-view',
      //           store: {
      //             fields:[
      //               'business', 'images'
      //             ],
      //             data: [{
      //               business: { 
      //                 name: 'Spudnicks', 
      //                 city: 'Culver City', 
      //                 street: '1131 Westwood Blvd',
      //                 state: 'CA',
      //                 zip: '90024'
      //               },
      //               images: [{
      //                 url: 'http://s3.amazonaws.com/dellerbie-places-food-images/662c1bad51b35fc071e46c651686be7c6569502c_lg.jpg', 
      //                 description: 'Waldorf Salad and Bar Fries - Delicious!'
      //               },{
      //                 url: 'http://s3.amazonaws.com/dellerbie-places-food-images/16b08904e7a10f6a815290220640aa66c86ece1e_lg.jpg', 
      //                 description: 'Pepperoni, mushroom and fresh basil. They sprinkle…'
      //               },{
      //                 url: 'http://s3.amazonaws.com/dellerbie-places-food-images/2582565f2fd08a328756c5fce83ea7cd83809dea_lg.jpg', 
      //                 description: 'Trust the cook ($7.95)'
      //               }]
      //             }]
      //           },
      //           itemTpl: new Ext.XTemplate(
      //             '<tpl for="business">',
      //               '<div class="business-wrapper">',
      //                 '<span class="place">{name}</span>',
      //                 '<span class="street">{street}</span>',
      //                 '<span class="city-state-zip">{city}, {state} {zip}</span>',
      //                 '<a class="map" href="http://maps.google.com/maps?q=8432+W+3rd+St+Los+Angeles+CA+90048">map</a>',
      //               '</div>',
      //               '<h3>More Photos from {name}</h3>',
      //             '</tpl>',
      //             '<tpl for="images">',
      //               '<img src="{url}" />',
      //               '<span class="what">{description}</span>',
      //             '</tpl>'
      //           )
      //         }]
      //       });
      // }
});