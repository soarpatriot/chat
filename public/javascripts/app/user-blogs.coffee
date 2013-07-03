###
  this is used for user post one article
###

list = ['jquery','bootstrap','bootstrapPaginator']

require list, ($) ->
  $ ->
    # split pages
    pageSize = 10
    mod = $('#total-count').val() % pageSize
    subTotal = $('#total-count').val() / pageSize
    totalPages = subTotal

    if mod is 0
      totalPages subTotal
    else
      totalPages = subTotal + 1

    currentPage = $('#current-page').val()
    discoveriorId = $('#discoverior-id').val()

    options =
      currentPage: currentPage,
      totalPages: totalPages,
      size:"normal",
      alignment:"right"
      pageUrl: (type, page, current) ->
                  "/users/"+discoveriorId+'/'+page
    $('#pagination-div').bootstrapPaginator options

    # delete own post
    $('button[name="del-post-btn"]').click ->



