/**
 * The Number field creates an HTML5 number input and is usually created inside a form. Because it creates an HTML
 * number input field, most browsers will show a specialized virtual keyboard for entering numbers. The Number field
 * only accepts numerical input and also provides additional spinner UI that increases or decreases the current value
 * by a configured {@link #stepValue step value}. Here's how we might use one in a form:
 * 
 *     Ext.create('Ext.form.Panel', {
 *         tbar: {
 *             text: 'Register'
 *         },
 *         
 *         items: [
 *             {
 *                 xtype: 'numberfield',
 *                 label: 'Age',
 *                 minValue: 18,
 *                 maxValue: 150,
 *                 name: 'age'
 *             }
 *         ]
 *     }).show();
 * 
 * Or on its own, outside of a form:
 * 
 *     Ext.create('Ext.field.Number', {
 *         label: 'Age',
 *         value: '26'
 *     }).show();
 * 
 * ## minValue, maxValue and stepValue
 * 
 * The {@link #minValue} and {@link #maxValue} configurations are self-explanatory and simply constrain the value
 * entered to the range specified by the configured min and max values. The other option exposed by this component
 * is {@link #stepValue}, which enables you to set how much the value changes every time the up and down spinners
 * are tapped on. For example, to create a salary field that ticks up and down by $1,000 each tap we can do this:
 * 
 *     Ext.create('Ext.field.Number', {
 *         label: 'Salary',
 *         value: 30000,
 *         minValue: 25000,
 *         maxValue: 50000,
 *         stepValue: 1000
 *     });
 * 
 * This creates a field that starts with a value of $30,000, steps up and down in $1,000 increments and will not go
 * beneath $25,000 or above $50,000.
 * 
 * Because number field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text 
 * fields provide, including getting and setting the value at runtime, validations and various events that are fired as
 * the user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional functionality 
 * available.
 */
Ext.define('Ext.field.Number', {
    extend: 'Ext.field.Text',
    alias : 'widget.numberfield',
    alternateClassName: 'Ext.form.Number',

    config: {
        // @inherit
        component: {
            type: 'number'
        },

        // @inherit
        ui: 'number',

        /**
         * @cfg {Number} minValue The minimum value that this Number field can accept
         * @accessor
         */
        minValue: null,

        /**
         * @cfg {Number} maxValue The maximum value that this Number field can accept
         * @accessor
         */
        maxValue: null,

        /**
         * @cfg {Number} stepValue The amount by which the field is incremented or decremented each time the spinner is tapped.
         * Defaults to undefined, which means that the field goes up or down by 1 each time the spinner is tapped
         * @accessor
         */
        stepValue: null
    },

    applyValue: function(value) {
        var minValue = this.getMinValue(),
            maxValue = this.getMaxValue();
        
        if (Ext.isNumber(minValue)) {
            value = Math.max(value, minValue);
        }

        if (Ext.isNumber(maxValue)) {
            value = Math.min(value, maxValue);
        }

        return parseFloat(value);
    },

    getValue: function() {
        var value = this.callParent();
        return parseFloat(value || 0);
    },

    // @private
    updateMinValue: function(newMinValue) {
        this.getComponent().setMinValue(newMinValue);
    },

    // @private
    updateMaxValue: function(newMaxValue) {
        this.getComponent().setMaxValue(newMaxValue);
    },

    // @private
    updateStepValue: function(newStepValue) {
        this.getComponent().setStepValue(newStepValue);
    }
});
