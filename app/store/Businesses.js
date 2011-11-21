Ext.define('Grubm.store.Businesses', {
  extend: 'Ext.data.Store',
    fields:[
      'business', 'images'
    ],
    data: [{
      business: { 
        name: 'Spudnicks', 
        city: 'Culver City', 
        street: '1131 Westwood Blvd',
        state: 'CA',
        zip: '90024'
      },
      images: [{
        url: 'http://s3.amazonaws.com/dellerbie-places-food-images/662c1bad51b35fc071e46c651686be7c6569502c_lg.jpg', 
        description: 'Waldorf Salad and Bar Fries - Delicious!'
      },{
        url: 'http://s3.amazonaws.com/dellerbie-places-food-images/16b08904e7a10f6a815290220640aa66c86ece1e_lg.jpg', 
        description: 'Pepperoni, mushroom and fresh basil. They sprinkle…'
      },{
        url: 'http://s3.amazonaws.com/dellerbie-places-food-images/2582565f2fd08a328756c5fce83ea7cd83809dea_lg.jpg', 
        description: 'Trust the cook ($7.95)'
      }]
    }]
});