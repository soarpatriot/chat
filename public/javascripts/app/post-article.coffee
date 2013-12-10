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
    },
    'area':{
      exports:'area'
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

  $("#tag-select").select2()

  initTip = (id) ->
    tagId = $("#"+id).val()
    if tagId
      $("#"+tagId).removeClass('hidden')

  initTip("tag-select")

  $("#tag-select").on "select2-close",->
    $("#tag-desc-div div").addClass('hidden')
    initTip("tag-select")


  countries = _.map Area, (places,key) -> places
  $("#country-input").select2(placeholder:"选择国家",data:countries)

  $("#country-input").on "select2-close",->

    $("#province-div").addClass('hidden')
    $("#province-input").select2 "enable",false
    $("#district-div").addClass('hidden')
    $("#district-input").select2 "enable",false
    $("#county-div").addClass('hidden')
    $("#county-input").select2 "enable",false

    country = $(this).val()
    if country
      $("#country-text").val(Area[country].text)
      provinces = _.map Area[country].places, (places,key) -> places
    if provinces and provinces.length > 0
      $("#province-input").select2 "enable",true
      $("#province-input").select2 placeholder:"择省份，直辖市",data:provinces
      $("#province-div").removeClass('hidden')


  $("#province-input").on "select2-close",->

    $("#district-div").addClass('hidden')
    $("#county-div").addClass('hidden')
    $("#county-input").select2 "enable",false
    $("#district-input").select2 "enable",false

    country = $("#country-input").val()
    province = $(this).val()
    if country and province
      provinceObj = Area[country]["places"][province]
      districtsMap = provinceObj["places"]
      provinceText = provinceObj["text"]
      $("#province-text").val(provinceText)

      districts = _.map districtsMap, (places,key) -> places
    if districts and districts.length > 0
      $("#district-input").select2 "enable",true
      $("#district-input").select2 placeholder:"选择市,区", data:districts
      $("#district-div").removeClass('hidden')


  $("#district-input").on "select2-close",->
    $("#county-div").addClass('hidden')
    $("#county-input").select2 "enable",false
    country = $("#country-input").val()
    province = $("#province-input").val()
    district = $(this).val()

    if country and province and district
      districtObj = Area[country]["places"][province]["places"][district]
      countyMap = districtObj["places"]
      districtText = districtObj["text"]
      $("#district-text").val(districtText)
      counties = _.map countyMap, (places,key) -> places

    if counties and counties.length > 0
      $("#county-input").select2 "enable",true
      $("#county-input").select2 placeholder:"选择县",data:counties
      $("#county-div").removeClass('hidden')

  $("#county-input").on "select2-close",->
    country = $("#country-input").val()
    province = $("#province-input").val()
    district = $("#district-input").val()

    county = $(this).val()
    if country and province and district and county
      countryText = Area[country]["places"][province]["places"][district]["places"][county]["text"]
      $("#county-text").val(countryText)



  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation()
  converter = new Showdown.converter()

  $("#editor-area").keyup ->
    txt = $("#editor-area").val()
    html = converter.makeHtml(txt)
    $("#preview-content").html(html)
    ###
     $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"))
    ###

