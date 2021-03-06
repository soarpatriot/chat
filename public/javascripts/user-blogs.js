// Generated by CoffeeScript 1.7.1

/*
  this is used for user post one article
 */

(function() {
  require(['jquery', 'bootstrap', 'bootstrapPaginator', 'jquery.colorbox'], function($) {
    return $(function() {
      var currentPage, discoveriorId, groups, mod, options, pageSize, subTotal, totalPages;
      groups = $('.thumb-image');
      $.each(groups, function(index, group) {
        var groupname;
        groupname = $(group).attr('name');
        return $('a[class="' + groupname + '"]').colorbox({
          rel: groupname,
          maxWidth: "100%"
        });
      });
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
        bootstrapMajorVersion: 3,
        alignment: "right",
        pageUrl: function(type, page, current) {
          return "/users/" + discoveriorId + '/' + page;
        }
      };
      $('#pagination').bootstrapPaginator(options);
      $('#cancel-del-btn').click(function() {
        return $('#post-del-confirm').modal('hide');
      });
      $('#confirm-del-btn').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#' + postId + '-method').val('delete');
        return $('#' + postId).submit();
      });
      $('button[name="del-post-btn"]').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#confirm-del-btn').attr('data-post-id', postId);
        return $('#post-del-confirm').modal();
      });
      $('button[name="qi-post-btn"]').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#' + postId + '-method').val('put');
        return $('#' + postId).submit();
      });
      $('button[name="shen-post-btn"]').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#' + postId + '-method').val('put');
        return $('#' + postId).submit();
      });
      return $('button[name="kang-post-btn"]').click(function() {
        var postId;
        postId = $(this).attr('data-post-id');
        $('#' + postId + '-method').val('put');
        return $('#' + postId).submit();
      });
    });
  });

}).call(this);

//# sourceMappingURL=user-blogs.map
