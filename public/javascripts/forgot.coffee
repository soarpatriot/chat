###
  this is used for user post one article
###


require ['jquery','underscore','bootstrap','jqBootstrapValidation'], ($,_) ->
  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

