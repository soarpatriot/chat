###
  this is used for user post one article
###


require ['jquery','bootstrap','jquery.colorbox'], ($) ->

  groups = $('.thumb-image')
  $.each(groups, (index, group) ->
    groupname = $(group).attr('name')
    $('a[class="'+groupname+'"]').colorbox({rel:groupname,maxWidth:"100%"})
  )

  $("#comment-btn").click ->
    content = $("#content-div").text()
    $("#content-hidden").val(content)
    $("#comment-form").submit()

