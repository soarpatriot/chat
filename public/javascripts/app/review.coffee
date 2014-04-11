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
    'bootstrap':'bootstrap.min'
    'underscore': 'underscore'
    'jquery.colorbox':'jquery.colorbox'
require ['jquery','underscore','bootstrap','jquery.colorbox'], ($,_) ->
    $ ->

      groups = $('.thumb-image')
      $.each(groups, (index, group) ->
        groupname = $(group).attr('name')
        $('a[class="'+groupname+'"]').colorbox({rel:groupname,maxWidth:"100%"})
      )

      postId = $('#post-id').val()
      wait = 9000
      supportText = $('#support').text();
      voteText = $('#veto').text();

      $('#support').button('loading')
      $('#veto').button('loading')

      timeLeft = ->

        waitSecond = wait/1000

        $('#support').text(supportText+ '('+waitSecond+')');
        $('#veto').text(voteText+ '('+ waitSecond+')');
        if(wait<=0)
          $('#support').button('reset')
          $('#veto').button('reset')
          clearInterval(btnInterval)
        wait = wait-1000;

      if(postId && postId!='empty')
        btnInterval = setInterval timeLeft, 1000

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


