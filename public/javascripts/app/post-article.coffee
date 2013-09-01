###
  this is used for user post one article
###
require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
      deps: ['jquery']
    }

  paths:
    'jquery': 'jquery-1.9.1.min'
    'bootstrap':'bootstrap.min'





require ['jquery','bootstrap'], ($) ->
  ###
    $('#btn-guide').click ->
      $('#guide-makedown').modal()
