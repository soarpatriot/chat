// Generated by CoffeeScript 1.6.3
/*
  Add your application's coffee-script code here
  Global Applcitiaon
*/


(function() {
  var list;

  require.config({
    baseUrl: '/javascripts',
    shim: {
      'bootstrap': {
        deps: ['jquery']
      }
    },
    paths: {
      'bootstrap': 'bootstrap.min',
      'jquery': 'jquery-1.9.1.min'
    }
  });

  list = ['jquery', 'bootstrap'];

  require(list, function($) {});

}).call(this);
