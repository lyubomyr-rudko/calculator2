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

        addValue: function (val) {
            //check if we nead to add a value to this param, or replace it
            if (this.currentParam instanceof Array) {
                //dot is allowed only once
                if (val === '.' && this.dotIsEntered(this.currentParam)) {
                    return;
                }
            } else {
                if (val === '.') {
                    val = '0.';
                }

                this.params.second = [];
                if (this.action) {
                    this.currentParam = this.params.second;
                    //this.params.push([val]);
                } else {
                    this.params.first = [];
                    this.currentParam = this.params.first;
                    // this.params = [[val]];
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

        addAction: function (a) {
            if (a === this.actions.ce) {
                this.reset();
                return;
            }

            if (this.params.second === this.currentParam) {
                this.performAction();
            }

            if (a !== this.actions.equal) {
                this.currentParam = this.params.second;
            }

            this.action = a;

            if (this.action === this.actions.equal) {
                this.action = null;
            }
        },

        performAction: function () {
            var value1,
                value2 = parseFloat(this.params.second.join('')),
                res = 0;

            if (this.params.first instanceof Array) {
                value1 = parseFloat(this.params.first.join(''));
            } else {
                value1 = this.params.first;
            }

            if (this.action === this.actions.add) {
                res = value1 + value2;
            } else if (this.action === this.actions.substruct) {
                res = value1 - value2;
            } else if (this.action === this.actions.multiply) {
                res = value1 * value2;
            } else if (this.action === this.actions.divide) {
                res = value1 / value2;
            }

            this.reset();

            this.params.first = res;
            this.currentParam = this.params.first;
        },

        getOutput: function () {
            var value1,
                value2;

            if (this.params.second) {
                value2 = this.params.second.join('');
            }

            if (this.params.first instanceof Array) {
                value1 = this.params.first.join('');
            } else {
                value1 = this.params.first;
            }

            return value2 || value1 || '0';
        },

        actions: {
            equal: 'equal',
            ce: 'ce', //clear
            add: 'add',
            substruct: 'substruct',
            multiply: 'multiply',
            divide: 'divide'
        }
    });

    return CalculatorModel;
});