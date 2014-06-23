###
  this is used for user post one article
###

require  ['jquery','bootstrap','bootstrapPaginator','jquery.colorbox'], ($) ->
  $ ->
    groups = $('.thumb-image')
    $.each(groups, (index, group) ->
      groupname = $(group).attr('name')
      $('a[class="'+groupname+'"]').colorbox({rel:groupname,maxWidth:"100%"})
    )


    # split pages
    pageSize = 10
    mod = $('#total-count').val() % pageSize
    subTotal = $('#total-count').val() / pageSize
    totalPages = subTotal

    if mod is 0
      totalPages = subTotal
    else
      totalPages = subTotal + 1

    currentPage = $('#current-page').val()
    discoveriorId = $('#discoverior-id').val()

    options =
      currentPage: currentPage,
      totalPages: totalPages,
      size:"normal",
      bootstrapMajorVersion:3
      alignment:"right"
      pageUrl: (type, page, current) ->
                  "/users/"+discoveriorId+'/'+page
    $('#pagination').bootstrapPaginator options
    #$('#pagination-div ul').addClass('pagination')
    # cancel delete post
    $('#cancel-del-btn').click ->
      $('#post-del-confirm').modal('hide')

    # delete post
    $('#confirm-del-btn').click ->
      postId = $(this).attr('data-post-id')
      $('#'+postId+'-method').val('delete')
      $('#'+postId).submit();
    # open delete own post dialog
    $('button[name="del-post-btn"]').click ->
      postId = $(this).attr('data-post-id')
      $('#confirm-del-btn').attr('data-post-id',postId)
      $('#post-del-confirm').modal()

    $('button[name="qi-post-btn"]').click ->
      postId = $(this).attr('data-post-id')
      $('#'+postId+'-method').val('put')
      $('#'+postId).submit();

    $('button[name="shen-post-btn"]').click ->
      postId = $(this).attr('data-post-id')
      $('#'+postId+'-method').val('put')
      $('#'+postId).submit();

    $('button[name="kang-post-btn"]').click ->
      postId = $(this).attr('data-post-id')
      $('#'+postId+'-method').val('put')
      $('#'+postId).submit();
