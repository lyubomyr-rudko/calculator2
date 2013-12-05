/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    var ParamsModel = Backbone.Model.extend({
        defaults: {
            first: [],
            second: [],
            current: null
        },
        initialize: function () {
            this.reset();
        },
        reset: function () {
            this.set('first', []);
            this.set('second', []);
            this.set('current', this.get('first'));
        },
        getFirstValue: function (parsed) {
            var res;
            //first parameter might contain array of digits, in case user has been enteing it,
            // or be a float number in case it is a result of previouce operation
            if (this.get('first') instanceof Array) {
                res = this.get('first').join('');
            } else {
                res = this.get('first');
            }

            return parsed ? parseFloat(res) : res;
        },

        //get value of the second parameter - as a string, or (if parsed === true) as a float
        getSecondValue: function (parsed) {
            var res = this.get('second').join('');

            return parsed ? parseFloat(res) : res;
        },

        dotIsEntered: function () {
            return _.some(this.get('current'), function (item) { return '.' === item; });
        },

        currentParamIsBlank: function () {
            return this.get('current').length === 0;
        }
    });

    return ParamsModel;
});