/**
 * @private
 */
Ext.define('Ext.field.Input', {
    extend: 'Ext.Component',
    xtype : 'input',

    cachedConfig: {
        /**
         * @cfg {String} inputCls The className to be applied to this input
         * @accessor
         */
        inputCls: Ext.baseCSSPrefix + 'form-field',

        /**
         * @cfg {String} focusCls The CSS class to use when the field receives focus
         * @accessor
         */
        focusCls: Ext.baseCSSPrefix + 'field-focus',

        // @private
        maskCls: Ext.baseCSSPrefix + 'field-mask',
        
        /**
         * True to use a mask on this field, or `auto` to automatically select when you should use it.
         * @cfg {String/Boolean} useMask
         * @private
         * @accessor
         */
        useMask: 'auto',

        /**
         * @cfg {String} type The type attribute for input fields -- e.g. radio, text, password, file (defaults
         * to 'text'). The types 'file' and 'password' must be used to render those field types currently -- there are
         * no separate Ext components for those.
         * @accessor
         */
        type: 'text',

        /**
         * @cfg {Boolean} checked <tt>true</tt> if the checkbox should render initially checked (defaults to <tt>false</tt>)
         * @accessor
         */
        checked: false
    },

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'field-input',

        /**
         * @cfg {String} tag The el tag
         * @accessor
         */
        tag: 'input',

        /**
         * @cfg {String} name The field's HTML name attribute
         * <b>Note</b>: this property must be set if this field is to be automatically included with
         * {@link Ext.form.Panel#submit form submit()}.
         * @accessor
         */
        name: null,

        /**
         * @cfg {Mixed} value A value to initialize this field with (defaults to undefined).
         * @accessor
         */
        value: null,
        
        /**
         * @property {Boolean} <tt>True</tt> if the field currently has focus.
         * @accessor
         */
        isFocused: false,

        /**
         * @cfg {Number} tabIndex The tabIndex for this field. Note this only applies to fields that are rendered,
         * not those which are built via applyTo (defaults to undefined).
         * @accessor
         */
        tabIndex: null,

        /**
         * @cfg {String} placeHolder A string value displayed in the input (if supported) when the control is empty.
         * @accessor
         */
        placeHolder: null,

        /**
         * @cfg {Number} minValue The minimum value that this Number field can accept (defaults to undefined, e.g. no minimium)
         * @accessor
         */
        minValue: null,

        /**
         * @cfg {Number} maxValue The maximum value that this Number field can accept (defaults to undefined, e.g. no maximum)
         * @accessor
         */
        maxValue: null,

        /**
         * @cfg {Number} stepValue The amount by which the field is incremented or decremented each time the spinner is tapped.
         * Defaults to undefined, which means that the field goes up or down by 1 each time the spinner is tapped
         * @accessor
         */
        stepValue: null,

        /**
         * @cfg {Number} maxLength The maximum number of permitted input characters (defaults to 0).
         * @accessor
         */
        maxLength: null,

        /**
         * True to set the field's DOM element autocomplete attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset
         * @cfg {Boolean} autoComplete
         * @accessor
         */
        autoComplete: null,

        /**
         * True to set the field's DOM element autocapitalize attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset
         * @cfg {Boolean} autoCapitalize
         * @accessor
         */
        autoCapitalize: null,

        /**
         * True to set the field DOM element autocorrect attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset.
         * @cfg {Boolean} autoCorrect
         * @accessor
         */
        autoCorrect: null,

        /**
         * True to set the field DOM element readonly attribute to "true". Defaults to undefined, leaving the attribute unset.
         * @cfg {Boolean} readOnly
         * @accessor
         */
        readOnly: null,

        /**
         * Sets the field DOM element maxRows attribute. Defaults to undefined, leaving the attribute unset.
         * @cfg {Number} maxRows
         * @accessor
         */
        maxRows: null,

        /**
         * @cfg {Boolean} disabled True to disable the field (defaults to false).
         * <p>Be aware that conformant with the <a href="http://www.w3.org/TR/html401/interact/forms.html#h-17.12.1">HTML specification</a>,
         * disabled Fields will not be {@link Ext.form.Panel#submit submitted}.</p>
         * @accessor
         */

        /**
         * <p>The value that the Field had at the time it was last focused. This is the value that is passed
         * to the {@link Ext.field.Text#change} event which is fired if the value has been changed when the Field is blurred.</p>
         * <p><b>This will be undefined until the Field has been visited.</b> Compare {@link #originalValue}.</p>
         * @cfg {Mixed} startValue
         * @accessor
         */
        startValue: false
    },

    /**
     * @cfg {String/Number} originalValue The original value when the input is rendered
     * @private
     */
    originalValue: undefined,

    // @private
    getTemplate: function() {
        var items = [
            {
                reference: 'input',
                tag: this.getTag()
            },
            {
                reference: 'clearIcon',
                cls: 'x-clear-icon',
                html: 'x'
            }
        ];

        items.push({
            reference: 'mask',
            classList: [this.getMaskCls()]
        });

        return items;
    },

    // @inherit
    initElement: function() {
        var me = this;

        me.callParent();

        me.input.on({
            scope: me,

            keyup    : 'onKeyUp',
            focus    : 'onFocus',
            blur     : 'onBlur',
            paste    : 'onPaste'
            // mousedown: 'onMouseDown',
            // click    : 'onClick'
        });

        me.mask.on({
            tap: 'onMaskTap',
            scope: me
        });

        if (me.clearIcon) {
            me.clearIcon.on({
                tap: 'onClearIconTap',
                scope: me
            });
        }

        me.doInitValue();
    },

    // @private
    doInitValue: function() {
        /**
         * @property {Mixed} originalValue
         * The original value of the field as configured in the {@link #value} configuration
         */
        this.originalValue = this.getValue();
    },

    applyUseMask: function(useMask) {
        if (useMask === 'auto') {
            useMask = Ext.os.is.iOS && Ext.os.version.lt('5');
        }

        return Boolean(useMask);
    },

    /**
     * Updates the useMask configuration
     */
    updateUseMask: function(newUseMask) {
        this.mask[newUseMask ? 'show' : 'hide']();
    },

    /**
     * Helper method to update a specified attribute on the fieldEl, or remove the attribute all together
     * @private
     */
    updateFieldAttribute: function(attribute, newValue) {
        var input = this.input;

        if (newValue) {
            input.dom.setAttribute(attribute, newValue);
        } else {
            input.dom.removeAttribute(attribute);
        }
    },

    /**
     * Updates the {@link #inputCls} configuration
     */
    updateInputCls: function(newInputCls, oldInputCls) {
        this.input.addCls(Ext.baseCSSPrefix + 'input-el');
        this.input.replaceCls(oldInputCls, newInputCls);
    },

    /**
     * Updates the type attribute with the {@link #type} configuration
     * @private
     */
    updateType: function(newType, oldType) {
        var prefix = Ext.baseCSSPrefix + 'input-';

        this.input.replaceCls(prefix + oldType, prefix + newType);
        this.updateFieldAttribute('type', newType);
    },

    /**
     * Updates the name attribute with the {@link #name} configuration
     * @private
     */
    updateName: function(newName) {
        this.updateFieldAttribute('name', newName);
    },

    /**
     * Returns the field data value
     * @return {Mixed} value The field value
     */
    getValue: function() {
        var input = this.input;

        if (input) {
            this._value = input.dom.value;
        }

        return this._value;
    },

    // @private
    applyValue: function(value) {
        return (Ext.isEmpty(value)) ? '' : value;
    },

    /**
     * Updates the {@link #value} configuration
     * @private
     */
    updateValue: function(newValue) {
        var input = this.input;

        if (input) {
            input.dom.value = newValue;
        }
    },

    setValue: function(newValue) {
        this.updateValue(this.applyValue(newValue));
        return this;
    },

    //<debug>
    // @private
    applyTabIndex: function(tabIndex) {
        if (tabIndex !== null && typeof tabIndex != 'number') {
            throw new Error("Ext.field.Field: [applyTabIndex] trying to pass a value which is not a number");
        }
        return tabIndex;
    },
    //</debug>

    /**
     * Updates the tabIndex attribute with the {@link #tabIndex} configuration
     * @private
     */
    updateTabIndex: function(newTabIndex) {
        this.updateFieldAttribute('tabIndex', newTabIndex);
    },

    // @private
    testAutoFn: function(value) {
        return [true, 'on'].indexOf(value) !== -1;
    },

    //<debug>
    applyMaxLength: function(maxLength) {
        if (maxLength !== null && typeof maxLength != 'number') {
            throw new Error("Ext.field.Text: [applyMaxLength] trying to pass a value which is not a number");
        }
        return maxLength;
    },
    //</debug>

    /**
     * Updates the maxlength attribute with the {@link #maxLength} configuration
     * @private
     */
    updateMaxLength: function(newMaxLength) {
        this.updateFieldAttribute('maxlength', newMaxLength);
    },

    /**
     * Updates the placeholder attribute with the {@link #placeHolder} configuration
     * @private
     */
    updatePlaceHolder: function(newPlaceHolder) {
        this.updateFieldAttribute('placeholder', newPlaceHolder);
    },

    // @private
    applyAutoComplete: function(autoComplete) {
        return this.testAutoFn(autoComplete);
    },

    /**
     * Updates the autocomplete attribute with the {@link #autoComplete} configuration
     * @private
     */
    updateAutoComplete: function(newAutoComplete) {
        var value = newAutoComplete ? 'on' : 'off';
        this.updateFieldAttribute('autocomplete', value);
    },

    // @private
    applyAutoCapitalize: function(autoCapitalize) {
        return this.testAutoFn(autoCapitalize);
    },

    /**
     * Updates the autocapitalize attribute with the {@link #autoCapitalize} configuration
     * @private
     */
    updateAutoCapitalize: function(newAutoCapitalize) {
        var value = newAutoCapitalize ? 'on' : 'off';
        this.updateFieldAttribute('autocapitalize', value);
    },

    // @private
    applyAutoCorrect: function(autoCorrect) {
        return this.testAutoFn(autoCorrect);
    },

    /**
     * Updates the autocorrect attribute with the {@link #autoCorrect} configuration
     * @private
     */
    updateAutoCorrect: function(newAutoCorrect) {
        var value = newAutoCorrect ? 'on' : 'off';
        this.updateFieldAttribute('autocorrect', value);
    },

    /**
     * Updates the min attribute with the {@link #minValue} configuration
     * @private
     */
    updateMinValue: function(newMinValue) {
        this.updateFieldAttribute('min', newMinValue);
    },

    /**
     * Updates the max attribute with the {@link #maxValue} configuration
     * @private
     */
    updateMaxValue: function(newMaxValue) {
        this.updateFieldAttribute('max', newMaxValue);
    },

    /**
     * Updates the step attribute with the {@link #stepValue} configuration
     * @private
     */
    updateStepValue: function(newStepValue) {
        this.updateFieldAttribute('step', newStepValue);
    },

    // @private
    checkedRe: /^(true|1|on)/i,

    /**
     * Returns the checked value of this field
     * @return {Mixed} value The field value
     */
    getChecked: function() {
        var el = this.input,
            checked;

        if (el) {
            checked = el.dom.checked;
            this._checked = checked;
        }

        return checked;
    },

    // @private
    applyChecked: function(checked) {
        return !!this.checkedRe.test(String(checked));
    },

    /**
     * Updates the autocorrect attribute with the {@link #autoCorrect} configuration
     * @private
     */
    updateChecked: function(newChecked) {
        this.input.dom.checked = newChecked;
    },

    /**
     * Updates the readonly attribute with the {@link #readOnly} configuration
     * @private
     */
    updateReadOnly: function(readOnly) {
        this.updateFieldAttribute('readonly', readOnly);
    },

    //<debug>
    // @private
    applyMaxRows: function(maxRows) {
        if (maxRows !== null && typeof maxRows !== 'number') {
            throw new Error("Ext.field.Input: [applyMaxRows] trying to pass a value which is not a number");
        }
    },
    //</debug>

    updateMaxRows: function(newRows) {
        this.updateFieldAttribute('rows', newRows);
    },

    // @inherit
    doSetDisabled: function(disabled) {
        this.callParent(arguments);

        this.input.dom.disabled = disabled;

        if (!disabled) {
            this.blur();
        }
    },

    /**
     * <p>Returns true if the value of this Field has been changed from its original value.
     * Will return false if the field is disabled or has not been rendered yet.</p>
     */
    isDirty: function() {
        if (this.getDisabled()) {
            return false;
        }

        return String(this.getValue()) !== String(this.originalValue);
    },

    /**
     * Resets the current field value to the originally loaded value and clears any validation messages.
     */
    reset: function() {
        this.setValue(this.originalValue);
    },

    // @private
    onClearIconTap: function(e) {
        this.fireEvent('clearicontap', this, e);
    },

    // @private
    onMaskTap: function(e) {
        this.fireAction('masktap', [this, e], 'doMaskTap');
    },

    // @private
    doMaskTap: function() {
        if (this.getDisabled()) {
            return false;
        }

        this.maskCorrectionTimer = Ext.defer(this.showMask, 1000, this);
        this.hideMask();
    },

    // @private
    showMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'block');
        }
    },

    // @private
    hideMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'none');
        }
    },

    /**
     * Attempts to set the field as the active input focus.
     * @return {Ext.field.Input} this
     */
    focus: function() {
        var me = this,
            el = me.input;

        if (el && el.dom.focus) {
            el.dom.focus();
        }
        return me;
    },

    /**
     * Attempts to forcefully blur input focus for the field.
     * @return {Ext.field.Input} this
     */
    blur: function() {
        var me = this,
            el = this.input;

        if (el && el.dom.blur) {
            el.dom.blur();
        }
        return me;
    },

    onClick: function() {
        this.fireAction('click', arguments);
    },

    onChange: function() {
        this.fireAction('change', arguments);
    },

    onFocus: function() {
        this.fireAction('focus', arguments, 'doFocus');
    },

    // @private
    doFocus: function(e) {
        var me = this;

        if (me.mask) {
            if (me.maskCorrectionTimer) {
                clearTimeout(me.maskCorrectionTimer);
            }
            me.hideMask();
        }

        if (!me.getIsFocused()) {
            me.setIsFocused(true);
            me.setStartValue(me.getValue());
        }
    },

    onBlur: function() {
        this.fireAction('blur', arguments, 'doBlur');
    },

    // @private
    doBlur: function(e) {
        var me         = this,
            value      = me.getValue(),
            startValue = me.getStartValue();

        me.setIsFocused(false);

        if (String(value) != String(startValue)) {
            me.onChange(me, value, startValue);
        }

        me.showMask();

        // Ext.currentlyFocusedField = null;
    },

    onKeyUp: function() {
        this.fireAction('keyup', arguments);
    },

    onPaste: function() {
        this.fireAction('paste', arguments);
    },

    onMouseDown: function() {
        this.fireAction('mousedown', arguments);
    }
});
