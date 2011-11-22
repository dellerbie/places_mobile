Ext.define('Grubm.store.Cities', {
    extend  : 'Ext.data.Store',
    model   : 'Grubm.model.City',
    requires: ['Grubm.model.City'],
    data: [
     {name: 'Los Angeles', url: 'http://192.168.1.71:3000'},
     {name: 'New York City', url: 'http://192.168.1.71:3000'},
     {name: 'Philadelphia', url: 'http://192.168.1.71:3000'},
     {name: 'San Francisco', url: 'http://192.168.1.71:3000'}
    ]
});