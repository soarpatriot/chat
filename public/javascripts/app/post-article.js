// Generated by CoffeeScript 1.6.3
/*
  this is used for user post one article
*/


(function() {
  require.config({
    baseUrl: '/javascripts',
    shim: {
      'bootstrap': {
        deps: ['jquery']
      },
      'Showdown': {
        exports: 'Showdown'
      }
    },
    paths: {
      'jquery': 'jquery-1.9.1.min',
      'bootstrap': 'bootstrap.min',
      'Showdown': 'showdown'
    }
  });

  require(['jquery', 'Showdown', 'bootstrap'], function($, Showdown) {
    var converter;
    converter = new Showdown.converter();
    return $("#editor-area").keyup(function() {
      var html, txt;
      txt = $("#editor-area").val();
      html = converter.makeHtml(txt);
      $("#preview-content").html(html);
      return $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"));
    });
  });

}).call(this);
