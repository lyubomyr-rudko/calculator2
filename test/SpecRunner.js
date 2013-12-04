require.config({
    // baseUrl: '',
    paths: {
        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore',
        bootstrap: 'scripts/vendor/bootstrap',
        mocha: 'lib/mocha/mocha',
        chai: 'lib/chai',
        calc: 'scripts/models/calculator'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
        // mocha: {
        //     exports: 'mocha'
        // },
        // chai: {
        //     exports: 'chai'
        // }
    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'chai', 'mocha', 'jquery'], function(require) {
    'use strict';
    // Chai
    // var should = chai.should();

    /*globals mocha */
    mocha.setup('bdd');
    mocha.bail(false);

    require([
        'spec/test.js',
    ], function() {
        mocha.run();
    });

});