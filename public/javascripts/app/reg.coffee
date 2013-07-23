###
  this is used for user post one article
###

require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
      deps: ['jquery']
    }
    'jqBootstrapValidation':{
      deps: ['jquery']
    }
  paths:
    'bootstrap':'bootstrap.min',
    'jquery': 'jquery-1.9.1.min'
    'jqBootstrapValidation':'jqBootstrapValidation-1.3.7.min'



list = ['jquery','bootstrap','jqBootstrapValidation']

require list, ($) ->
  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
   

