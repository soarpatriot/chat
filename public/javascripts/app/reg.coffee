###
  this is used for user post one article
###



require ['jquery','bootstrap','jqBootstrapValidation'], ($) ->
  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
   

