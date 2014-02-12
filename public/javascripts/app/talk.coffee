###
  Add your application's coffee-script code here
  Global Applcitiaon
###
require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
    deps: ['jquery']
    },
    'chosen': {
    exports: 'chosen'
    }

  paths:
    'jquery': 'jquery-2.0.3.min'
    'bootstrap':'bootstrap.min'
    'socket.io':'socket.io'

require ['jquery','bootstrap','socket.io'], ($) ->
  socket = io.connect()

  message = (from, msg) ->
    console.log from + msg
    $('#lines').append($('<p>').append('<b>'+from+' : </b>'+msg))
    p = $('#lines p:last').position()
    size =  $('#lines p').size()
    $('#lines').get(0).scrollTop = size*200

  socket.on 'connect', ->
    console.log 'connect'

  socket.on 'announcement', (msg) ->
    $('#line').append($('<p>').append($('<em>')).text(msg))



  socket.on 'nickname', (nicknames) ->
    $('#nicknames').empty()
    for i in nicknames
        $('#nicknames').append($('<p>').text(nicknames[i]+'  '))

  socket.on 'user message', message


  socket.on 'reconnect', ->
    $('#line').remove()
    message('System update','reconnect server')

  socket.on 'reconnecting', ->
    message('System', 'Attempting to re-connect to the server')


  socket.on 'error', (e) ->
    message('System', e ? e : 'A unknown error occurred')





  $ ->
    $('#set-nickname').submit (ev) ->
      socket.emit('nickname',$('#nick').val())
      return false

    $('#send-message').submit ->
      socket.emit('user message', $('#editor_id').val())
      clear()
      return false



    clear = ->
      $('#editor_id').val('').focus()