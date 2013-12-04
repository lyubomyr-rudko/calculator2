/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
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
            if (this.currentParam instanceof Array) {
                //dot is allowed only once
                if (val === '.' && this.dotIsEntered(this.currentParam)) {
                    return;
                }

                //ignore zeros if no other digit preceeds it
                if ((val === 0 || val === '0') && this.currentParam.length === 0) {
                    return;
                }
            } else {
                //if carrent param is not an array of digits - it is a result of previouce computation

                //if user starts from dot - add a zero before it
                if (val === '.') {
                    val = '0.';
                }

                //start second parameter from scratch
                this.params.second = [];
                //if there is an action to perform - multiple operations done, use second parameter, keep the first
                if (this.action) {
                    this.currentParam = this.params.second;
                } else {
                    //else - clear and replace first parameter (result of the previouce operation) with new value
                    this.params.first = [];
                    this.currentParam = this.params.first;
                }
            }

            this.currentParam.push(val);
        },

        dotIsEntered: function (arr) {
            return _.some(arr, function (item) { return '.' === item; });
        },

        reset: function () {
            this.params = {first: [], second: []};
            this.currentParam = this.params.first;
            this.action = null;
        },

        //add an action (add, multiply)
        addAction: function (a) {
            if (a === this.actions.ce) {
                this.reset();
                return;
            }

            //if there is some other action entered - perform this action
            if (this.params.second === this.currentParam) {
                this.performAction();
            }

            //in case equal action is selected, we will start from entering first param
            //othervise - enter second param, save current action
            if (a !== this.actions.equal) {
                this.currentParam = this.params.second;
                this.action = a;
            } else {
                this.action = null;
            }
        },

        //perform selected action
        performAction: function () {
            var value1 = this.getFirstParamValue(true),
                value2 = this.getSecondParamValue(true),
                res = 0;

            //perfomr action
            if (this.action === this.actions.add) {
                res = value1 + value2;
            } else if (this.action === this.actions.substruct) {
                res = value1 - value2;
            } else if (this.action === this.actions.multiply) {
                res = value1 * value2;
            } else if (this.action === this.actions.divide) {
                res = value1 / value2;
            }
            //reset both params
            this.reset();
            //save result as a first param
            this.params.first = res;
            this.currentParam = this.params.first;
        },

        //get value of the first parameter - as a string, or (if parsed === true) as a float
        getFirstParamValue: function (parsed) {
            var res;
            //first parameter might contain array of digits, in case user has been enteing it,
            // or be a float number in case it is a result of previouce operation
            if (this.params.first instanceof Array) {
                res = this.params.first.join('');
            } else {
                res = this.params.first;
            }

            return parsed ? parseFloat(res) : res;
        },

        //get value of the second parameter - as a string, or (if parsed === true) as a float
        getSecondParamValue: function (parsed) {
            var res = this.params.second.join('');

            return parsed ? parseFloat(res) : res;
        },

        getOutput: function () {
            var value1 = this.getFirstParamValue(),
                value2 = this.getSecondParamValue();

            return value2 || value1 || 0;
        },

        actions: {
            equal: 'equal',
            ce: 'ce', //clear button value
            add: 'add',
            substruct: 'substruct',
            multiply: 'multiply',
            divide: 'divide'
        }
    });

    return CalculatorModel;
});