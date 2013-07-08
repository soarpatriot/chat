###
  review coffee-script
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
    'underscore': 'underscore'
    'bootstrap':'bootstrap.min'

list = ['jquery','underscore','bootstrap']

require list, ($,_) ->
    $ ->

      $('#support').click ->

         if check()
           $('#passed').attr value: 'true'
           $('#review-form').submit()
         else
           alert 'error'

      $('#veto').click ->

        if check()
          $('#passed').attr value: 'false'
          $('#review-form').submit()
        else
          alert 'error'

      check = ->
        postId = $('#post-id').val()
        valid = if _.isNull(postId) then false else true



