Ext.Loader.setConfig({ enabled: true });
// Ext.Loader.setPath('Ext.plugins.ListPagingPlugin', 'plugins/list/ListPaging.js');

Ext.application({
    name: 'Grubm',
    controllers: ['Main'],
    models: ['City']
});