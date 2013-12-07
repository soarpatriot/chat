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

  $("#country-select").select2
    placeholder: "Select a State",
    allowClear: true
  $("#province-select").select2()
  $("#district-select").select2()
  $("#county-select").select2()

  intertOptions = (id,data,emptyText) ->
    $("#"+id).empty()
    $("#"+id).select2("val", "")
    options = '<option></option>'
    for opt in data
      options += '<option value="'+opt.id+'">'+opt.text+'</option>'
    if options then $("#"+id).append options

  countries = _.map Area, (places,key) -> places
  intertOptions("country-select",countries,"选择国家")

  $("#country-select").on "select2-close",->

    $("#province-div").addClass('hidden')
    $("#province-select").select2 "enable",false
    $("#district-div").addClass('hidden')
    $("#district-select").select2 "enable",false
    $("#county-div").addClass('hidden')
    $("#county-select").select2 "enable",false

    country = $(this).val()
    console.log country
    provinces = _.map Area[country].places, (places,key) -> places
    if provinces and provinces.length > 0
      $("#province-select").select2 "enable",true
      $("#province-div").removeClass('hidden')
      intertOptions("province-select",provinces,"选择省份，直辖市")

  $("#province-select").on "select2-close",->

    $("#district-div").addClass('hidden')
    $("#county-div").addClass('hidden')
    $("#county-select").select2 "enable",false
    $("#district-select").select2 "enable",false

    country = $("#country-select").val()
    province = $(this).val()
    if province
      districts = _.map Area[country]["places"][province]["places"], (places,key) -> places
    if districts and districts.length > 0
      $("#district-select").select2 "enable",true
      $("#district-div").removeClass('hidden')
      intertOptions("district-select",districts,"选择市,区")

  $("#district-select").on "select2-close",->
    $("#county-div").addClass('hidden')
    $("#county-select").select2 "enable",false
    country = $("#country-select").val()
    province = $("#province-select").val()
    district = $(this).val()
    if district
      counties = _.map Area[country]["places"][province]["places"][district]["places"], (places,key) -> places
    if counties and counties.length > 0
      $("#county-select").select2 "enable",true
      $("#county-div").removeClass('hidden')
      intertOptions("county-select",counties,"选择县")


    ###
    $("#province-select").empty()
    $("#province-select").select2("val", "")
    options = ""
    for province in provinces
      options += '<option value="'+province.id+'">'+province.text+'</option>'
    if options then $("#province-select").append options
    ###

  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation()
  converter = new Showdown.converter()

  $("#editor-area").keyup ->
    txt = $("#editor-area").val()
    html = converter.makeHtml(txt)
    $("#preview-content").html(html)
    $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"))

