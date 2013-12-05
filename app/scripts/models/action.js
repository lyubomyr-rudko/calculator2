/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    var ActionModel = Backbone.Model.extend({
        perform: function (a, b) {
            var actionFn = this.get('actionFn');

            if (actionFn) {
                return actionFn(a, b);
            }
        }
    });

    return ActionModel;
});