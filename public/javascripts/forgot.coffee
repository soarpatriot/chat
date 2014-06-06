###
  this is used for user post one article
###
require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    }

  paths:
    'jquery': 'jquery-1.9.1.min'
    'bootstrap':'bootstrap.min'
    'jqBootstrapValidation':'jqBootstrapValidation-1.3.7.min'
    'underscore':'underscore'

require ['jquery','underscore','bootstrap','jqBootstrapValidation'], ($,_) ->
  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

