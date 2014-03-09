###
  this is used for user post one article
###
require.config
  baseUrl: '/javascripts',
  shim:
    'underscore': {
      exports: '_'
    },
    'bootstrap':{
      deps: ['jquery']
    }

  paths:
    'jquery': 'jquery-1.9.1.min'
    'bootstrap':'bootstrap.min'
    'underscore': 'underscore'


require ['jquery','bootstrap'], ($) ->
  $("#comment-btn").click ->
    content = $("#content-div").text()
    $("#content-hidden").val(content)
    $("#comment-form").submit()

