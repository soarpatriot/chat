// Generated by CoffeeScript 1.7.1

/*
  review coffee-script
 */

(function() {
  require(['jquery', 'underscore', 'bootstrap', 'jquery.colorbox'], function($, _) {
    return $(function() {
      var btnInterval, check, groups, postId, supportText, timeLeft, voteText, wait;
      groups = $('.thumb-image');
      $.each(groups, function(index, group) {
        var groupname;
        groupname = $(group).attr('name');
        return $('a[class="' + groupname + '"]').colorbox({
          rel: groupname,
          maxWidth: "100%"
        });
      });
      postId = $('#post-id').val();
      wait = 5000;
      supportText = $('#support').text();
      voteText = $('#veto').text();
      $('#support').button('loading');
      $('#veto').button('loading');
      timeLeft = function() {
        var waitSecond;
        waitSecond = wait / 1000;
        $('#support').text(supportText + '(' + waitSecond + ')');
        $('#veto').text(voteText + '(' + waitSecond + ')');
        if (wait <= 0) {
          $('#support').button('reset');
          $('#veto').button('reset');
          clearInterval(btnInterval);
        }
        return wait = wait - 1000;
      };
      if (postId && postId !== 'empty') {
        btnInterval = setInterval(timeLeft, 1000);
      }
      $('#support').click(function() {
        if (check()) {
          $('#passed').attr({
            value: 'true'
          });
          return $('#review-form').submit();
        } else {
          return alert('error');
        }
      });
      $('#veto').click(function() {
        if (check()) {
          $('#passed').attr({
            value: 'false'
          });
          return $('#review-form').submit();
        } else {
          return alert('error');
        }
      });
      return check = function() {
        var valid;
        postId = $('#post-id').val();
        return valid = _.isNull(postId) ? false : true;
      };
    });
  });

}).call(this);

//# sourceMappingURL=review.map
