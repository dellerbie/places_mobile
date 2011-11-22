Ext.define('Grubm.controller.Images', {
  extend: 'Ext.app.Controller',
  views: [
    'Main',
    'Food',
    'Business'
  ],
  stores: ['Cities', 'Images', 'Businesses'],
  refs: [{
    ref     : 'main',
    selector: 'mainview'
  },{
    ref: 'citypicker',
    selector: 'citypickerview'
  },{
    ref: 'food',
    selector: 'foodview'
  },{
    ref: 'images',
    selector: 'imagesview'
  },{
    ref: 'business',
    selector: 'businessview'
  }],
  
  init: function() {
    this.getMainView().create();
    this.control({
      'citypickerview': {
        select: this.onCitySelect
      },
      'foodview button[ui="back"]': {
        tap: this.onBackToCityPicker
      },
      'imagesview': {
        select: this.onImageSelect
      },
      'businessview button': {
        tap: this.onBackToFoodView
      }
    });
  },
  
  onCitySelect: function(list, city) {
    // change the proxy url
    this.getImages().getStore().load();
    this.getMain().getAt(0).setActiveItem(this.getFood(), {type: 'slide', direction: 'left'});
  },
  
  onBackToCityPicker: function() {
    this.getMain().getAt(0).setActiveItem(this.getCitypicker(), {type: 'slide', direction: 'right'});
  },
  
  onImageSelect: function(view, image) {
    var business = image.get('business').normalized_name;
    
    console.log(this.getBusiness().getStore().proxy);
    var proxy = this.getBusiness().getStore().proxy.url = "http://localhost:3000/business/" + business + ".json";
    
    this.getBusiness().getStore().load({params: {limit: 5}});
    this.getMain().getAt(0).setActiveItem(this.getBusiness(), {type: 'slide', direction: 'left'});
  },
  
  onBackToFoodView: function() {
    this.getMain().getAt(0).setActiveItem(this.getFood(), {type: 'slide', direction: 'right'});
  }
});