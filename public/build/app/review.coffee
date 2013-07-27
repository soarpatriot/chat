###
  review coffee-script
###


require ['jquery','underscore','bootstrap'], ($,_) ->
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



