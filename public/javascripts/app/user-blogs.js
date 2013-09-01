// Generated by CoffeeScript 1.6.3
/*
  this is used for user post one article
*/


(function() {
  require.config({
    baseUrl: '/javascripts',
    shim: {
      'bootstrap': {
        deps: ['jquery']
      }
    },
    paths: {
      'jquery': 'jquery-1.9.1.min',
      'bootstrap': 'bootstrap.min',
      'bootstrapPaginator': 'bootstrap-paginator.min'
    }
  });

  require(['jquery', 'bootstrap', 'bootstrapPaginator'], function($) {
    return $(function() {
      var currentPage, discoveriorId, mod, options, pageSize, subTotal, totalPages;
      pageSize = 10;
      mod = $('#total-count').val() % pageSize;
      subTotal = $('#total-count').val() / pageSize;
      totalPages = subTotal;
      if (mod === 0) {
        totalPages = subTotal;
      } else {
        totalPages = subTotal + 1;
      }
      currentPage = $('#current-page').val();
      discoveriorId = $('#discoverior-id').val();
      options = {
        currentPage: currentPage,
        totalPages: totalPages,
        size: "normal",
        alignment: "right",
        pageUrl: function(type, page, current) {
          return "/users/" + discoveriorId + '/' + page;
        }
      };
      $('#pagination-div').bootstrapPaginator(options);
      $('#cancel-del-btn').click(function() {
        return $('#post-del-confirm').modal('hide');
      });
      $('#confirm-del-btn').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        return $('#' + postId).submit();
      });
      return $('button[name="del-post-btn"]').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#confirm-del-btn').attr('data-post-id', postId);
        return $('#post-del-confirm').modal();
      });
    });
  });

}).call(this);
