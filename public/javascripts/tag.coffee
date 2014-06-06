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
    'chosen':'chosen.jquery.min'

require ['jquery','bootstrap'], ($) ->

  # cancel delete post
  $('#cancel-del-btn').click ->
    $('#tag-del-confirm').modal('hide')

  # delete post
  $('#confirm-del-btn').click ->
    #postId = $(this).attr('data-post-id')
    $('#delete-tag-form').submit()
  # open delete own post dialog
  $('a[name="delete-tag-btn"]').click ->
    tagId = $(this).attr('data-tag-id')
    $('#tag-id-hidden').val(tagId)
    $('#tag-del-confirm').modal()





