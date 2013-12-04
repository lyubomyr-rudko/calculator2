/*global describe, it, define */

define(function(require) {
    'use strict';

    var Calculator = require('calc'),
        chai = require('chai'),
        expect = chai.expect;

    describe('Calculator', function() {
        describe('Calculator', function() {
            it('should add two numbers', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(2);
                calc.addAction(calc.actions.add);
                calc.addValue(3);
                calc.addAction(calc.actions.equal);
                res = calc.getOutput();

                chai.expect(res).to.equal(5);
            });

            it('should multiply two numbers', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(2);
                calc.addAction(calc.actions.multiply);
                calc.addValue(3);
                calc.addAction(calc.actions.equal);
                res = calc.getOutput();

                chai.expect(res).to.equal(6);
            });

            it('should substruct two numbers', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(5);
                calc.addAction(calc.actions.substruct);
                calc.addValue(3);
                calc.addAction(calc.actions.equal);
                res = calc.getOutput();

                chai.expect(res).to.equal(2);
            });

            it('should divide two numbers', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(6);
                calc.addAction(calc.actions.divide);
                calc.addValue(3);
                calc.addAction(calc.actions.equal);
                res = calc.getOutput();

                chai.expect(res).to.equal(2);
            });

            it('CE should clear current value and action', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(2);
                calc.addAction(calc.actions.ce);
                res = calc.getOutput();

                chai.expect(res).to.equal(0);
            });

            it('should perform add, substruct, multiply and divide operations in a row', function() {
                var calc = new Calculator(),
                    res;

                calc.addValue(2);
                calc.addAction(calc.actions.add);
                calc.addValue(3);
                calc.addAction(calc.actions.substruct);
                calc.addValue(3);
                calc.addAction(calc.actions.multiply);
                calc.addValue(6);
                calc.addAction(calc.actions.divide);
                calc.addValue(6);
                calc.addAction(calc.actions.equal);
                res = calc.getOutput();

                chai.expect(res).to.equal(2);
            });
        });
    });
});