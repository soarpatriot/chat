###
  Add your application's coffee-script code here
  Global Applcitiaon
###

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





