###
  this is used for user post one article
###
require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
      deps: ['jquery']
    },
    'Showdown': {

      exports: 'Showdown'
    }

  paths:
    'jquery': 'jquery-1.9.1.min'
    'bootstrap':'bootstrap.min'
    'Showdown':'showdown'

require ['jquery','Showdown','bootstrap','jqBootstrapValidation'], ($,Showdown) ->
  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
  converter = new Showdown.converter();
  $("#editor-area").keyup ->
    txt = $("#editor-area").val()
    html = converter.makeHtml(txt)
    $("#preview-content").html(html)
    $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"))
