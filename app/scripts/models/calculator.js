/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CalculatorModel = Backbone.Model.extend({
        params: [],
        action: null,

        addValue: function (val) {
            var currentParam;

            if (!this.params.length) {
                this.params.push([]);
            }

            currentParam = this.params[this.params.length - 1];

            if (currentParam instanceof Array) {
                if (val === '.' && this.dotIsEntered(currentParam)) {
                    return;
                }

                currentParam.push(val);
            } else {
                if (val === '.') {
                    val = '0.';
                }

                if (this.action) {
                    this.params.push([val]);
                } else {
                    this.params = [[val]];
                }
            }
        },

        dotIsEntered: function (arr) {
            return _.some(arr, function (item) { return '.' === item; });
        },

        addAction: function (a) {
            if (a === this.actions.ce) {
                this.params = [];
                this.action = null;
                return;
            }

            if (this.params.length === 2) {
                this.performAction();
            } else if (a !== this.actions.equal) {
                this.params.push([]);
            }

            this.action = a;

            if (this.action === this.actions.equal) {
                this.action = null;
            }
        },
        performAction: function () {
            var value1,
                value2 = parseFloat(this.params[1].join('')),
                res = 0;

            if (this.params[0] instanceof Array) {
                value1 = parseFloat(this.params[0].join(''));
            } else {
                value1 = this.params[0];
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

            this.params = [res];
        },

        getOutput: function () {
            var value1,
                value2;

            if (this.params[1]) {
                value2 = this.params[1].join('');
            }

            if (this.params[0] instanceof Array) {
                value1 = this.params[0].join('');
            } else {
                value1 = this.params[0];
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