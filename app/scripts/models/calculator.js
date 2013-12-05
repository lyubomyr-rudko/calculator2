/*global define*/

define([
    'underscore',
    'backbone',
    'models/action',
    'models/params'
], function (_, Backbone, ActionModel, ParamsModel) {
    'use strict';

    var CalculatorModel = Backbone.Model.extend({
        params: null,
        currentParam: null,
        action: null,

        initialize: function () {
            this.reset();
        },

        //add a single digit
        addValue: function (val) {
            //check if we should add a 'val' digit to current param
            if (this.params.get('current') instanceof Array) {
                //dot is allowed only once, ignore zeros if no other digit preceeds it
                if (val === '.' && this.params.dotIsEntered() || ((val.toString() === '0') && this.params.currentParamIsBlank()) ) {
                    return;
                }
            } else {
                //if user starts from dot - add a zero before it
                if (val === '.') {
                    val = '0.';
                }

                //if carrent param is not an array of digits - it is a result of previouce computation
                //clear second parameter before puting digits into it
                this.params.set('second',  []);
                //if there is an action to perform - multiple operations done, use second parameter, keep the first
                if (this.action) {
                    this.params.set('current', this.params.get('second'));
                } else {
                    //else - clear and replace first parameter (result of the previouce operation) with new value
                    this.params.set('first', []);
                    this.params.set('current', this.params.get('first'));// = this.params.first;
                }
            }

            this.params.get('current').push(val);
        },

        reset: function () {
            this.params = new ParamsModel();
            this.action = null;
        },

        //add an action (add, multiply)
        addAction: function (a) {
            if (a === this.actions.ce) {
                this.reset();
                return;
            }

            //if there is some other action entered - perform this action
            if (this.params.get('second') === this.params.get('current')) {
                this.performAction();
            }

            //in case equal action is selected, we will start from entering first param
            //othervise - enter second param, save current action
            if (a !== this.actions.equal) {
                this.params.set('current', this.params.get('second'));
                this.action = a;
            } else {
                this.action = null;
            }
        },

        //perform selected action
        performAction: function () {
            var value1 = this.params.getFirstValue(true),
                value2 = this.params.getSecondValue(true),
                res = 0;

            //perfomr action
            res = this.action.perform(value1, value2);
            //reset both params
            this.reset();
            //save result as a first param
            this.params.set('first', res);
            this.params.set('current', res);
            this.currentParam = this.params.first;
        },

        getOutput: function () {
            var value1 = this.params.getFirstValue(),
                value2 = this.params.getSecondValue();

            return value2 || value1 || 0;
        },

        actions: {
            equal: new ActionModel(),
            ce: new ActionModel(),
            add: new ActionModel({ actionFn: function (a, b) { return a + b; } }),
            substruct: new ActionModel({ actionFn: function (a, b) { return a - b; } }),
            multiply: new ActionModel({ actionFn: function (a, b) { return a * b; } }),
            divide: new ActionModel({ actionFn: function (a, b) { return a / b; } })
        }
    });

    return CalculatorModel;
});