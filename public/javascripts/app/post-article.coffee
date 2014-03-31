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
    },
    'backbone': {
        deps: ['underscore'],
        exports: 'Backbone'
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
    'backbone': 'backbone'

    'load-image':'fileupload/load-image.min'
    'load-image-exif':'fileupload/load-image-exif'
    'load-image-ios':'fileupload/load-image-ios'
    'load-image-meta':'fileupload/load-image-meta'
    'canvas-to-blob':'fileupload/canvas-to-blob'


    'jquery.fileupload-validate':'fileupload/jquery.fileupload-validate'
    'jquery.fileupload-process':'fileupload/jquery.fileupload-process'
    'jquery.fileupload-image':'fileupload/jquery.fileupload-image'
    'jquery.iframe-transport':'fileupload/jquery.iframe-transport'
    'jquery.ui.widget': 'fileupload/vendor/jquery.ui.widget'
    'jquery.fileupload':'fileupload/jquery.fileupload'

require ['jquery','Showdown','underscore','area','backbone','load-image','bootstrap','chosen','select2','jqBootstrapValidation',
         'jquery.iframe-transport','jquery.fileupload','jquery.fileupload-validate'
], ($,Showdown,_,Area,Backbone,loadImage) ->

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


  ###
    upload images file
  ###
  ImageUploadView = Backbone.View.extend({
    tagName:'div'
    template: _.template($('#image-item-template').html())
    events: {
      "click a[name='cancel']": "cancel",
      "click a[name='delete']": "delete"
    }
    initialize: ->
      this.$el.html(this.template(this.model.toJSON()))
      this.imageArea = this.$('div[name="display-area"]')
      loadingImage = loadImage(
          this.file,
          (img) ->
            $image = $(img);
            $image.addClass('img-responsive').addClass('img-thumbnail');
            this.imageArea.append($image);
          ,
          {
            maxWidth:140,
            maxHeight:140,
            canvas:true
          }
      )
    render: ->
    cancel: ->
    delete: ->
  })
  obtainFileInfo = (file) ->
    size = file.size
    kbSize = size/1024
    sizeText = if kbSize/1024 > 0 then (kbSize/1024).toFixed(2) + ' MB' else kbSize.toFixed(2) + ' KB'
    fileInfo =
      name:file.name
      size:sizeText

  $('#fileupload').fileupload({
    url:'//106.186.22.114:8888/upload',
    dropZone: $('#dropzone'),
    dataType: 'json',
    autoUpload: true,

    acceptFileTypes: /(\.|\/)(gif|jpg|jpeg|png)$/i,
    maxFileSize: 5000000,
    disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
    previewMaxWidth: 140,
    previewMaxHeight: 140,
    previewCrop: true
  }).on('fileuploadadd',  (e, data) ->
    $this = $(this)
    that = $this.data('blueimp-fileupload') || $this.data('fileupload')
    options = that.options

    data.process( ->
      $this.fileupload('process', data)
    ).always( ->

    ).done( ->
      data.files.each (file) ->
        ImageUploadView image = new ImageUploadView(file);

    ).fail( ->

    )
  )