###
  this is used for user post one article
###

require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
    deps: ['jquery']
    }
  ,
  paths:
    'bootstrap':'bootstrap.min',
    'jquery': 'jquery-1.9.1.min'




list = ['jquery','bootstrap']

require list, ($) ->
   

