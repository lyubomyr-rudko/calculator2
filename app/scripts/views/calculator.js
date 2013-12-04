/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../models/calculator'
], function ($, _, Backbone, JST, Calculator) {
    'use strict';
    var calc = new Calculator(),
        actionsMap = {
            '+': calc.actions.add,
            '-': calc.actions.substruct,
            '*': calc.actions.multiply,
            '/': calc.actions.divide,
            '=': calc.actions.equal,
            'ce': calc.actions.ce
        };

    var CalculatorView = Backbone.View.extend({
        template: JST['app/scripts/templates/calculator.ejs'],
        events: {
            'click a[data-calculator-button]': function (e) {
                var button = $(e.currentTarget),
                    value = button.attr('data-calculator-button'),
                    display = this.$el.find('span.display');

                if (actionsMap[value]) {
                    calc.addAction(actionsMap[value]);
                } else {
                    calc.addValue(value);
                }

                display.html(calc.getOutput());
            }
        },
        initialize: function () {
            this.render();
            this.handleKeypress();
        },
        handleKeypress: function () {
            var that = this;

            $(document).keypress(function (e) {
                var value,
                    display = that.$el.find('span.display');

                if (e.charCode) {
                    value = String.fromCharCode(e.charCode);
                    if (actionsMap[value]) {
                        calc.addAction(actionsMap[value]);

                        that.animateBtnClick(value);
                    } else if (/^\d+$/.test(value)) {
                        calc.addValue(value);
                        that.animateBtnClick(value);

                    }
                }

                display.html(calc.getOutput());
            });
        },

        animateBtnClick: function (value) {
            this.$el.find('a[data-calculator-button="' + value + '"]').addClass("active").delay(100).queue(function(next){
                $(this).removeClass("active");
                next();
            });
        },

        render : function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return CalculatorView;
});