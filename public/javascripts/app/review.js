// Generated by CoffeeScript 1.6.2
/*
  review coffee-script
*/


(function() {
  var list;

  require.config({
    baseUrl: '/javascripts',
    shim: {
      'underscore': {
        exports: '_'
      },
      'bootstrap': {
        deps: ['jquery']
      }
    },
    paths: {
      'jquery': 'jquery-1.9.1.min',
      'underscore': 'underscore',
      'bootstrap': 'bootstrap.min'
    }
  });

  list = ['jquery', 'underscore', 'bootstrap'];

  require(list, function($, _) {
    return $(function() {
      var check;

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
        var postId, valid;

        postId = $('#post-id').val();
        return valid = _.isNull(postId) ? false : true;
      };
    });
  });

}).call(this);

/*
//@ sourceMappingURL=review.map
*/
