###
  this is used for user post one article
###
require.config
  baseUrl: '/javascripts',
  shim:

    'bootstrap':{
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'Showdown': {
      exports: 'Showdown'
    },
    'chosen': {
      exports: 'chosen'
    }


  paths:
    'jquery': 'jquery-1.9.1.min'
    'bootstrap':'bootstrap.min'
    'Showdown':'showdown'
    'chosen':'chosen.jquery.min'
    'select2':'select2'
    'jqBootstrapValidation':'jqBootstrapValidation-1.3.7.min'
    'area':'app/area'
    'underscore':'underscore'

require ['jquery','Showdown','underscore','area','bootstrap','chosen','select2','jqBootstrapValidation'], ($,Showdown,_,Area) ->
  ###
   $("#tag-select").chosen({no_results_text: "没有匹配的查找项！"});
  ###

  $("#tag-select").select2()

  countries =  _.map Area, (places,key) -> places

  options = ""
  for country in countries
    options += '<option value="'+country.id+'">'+country.text+'</option>'

  $("#country-select").append options

  $("#country-select").select2()
  $("#country-select").on "change",->
    country = $(this).val()

    district = _.map Area[country].places, (places,key) -> places
    console.log district

  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation()
  converter = new Showdown.converter()

  $("#editor-area").keyup ->
    txt = $("#editor-area").val()
    html = converter.makeHtml(txt)
    $("#preview-content").html(html)
    $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"))

