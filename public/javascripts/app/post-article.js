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
    },
    paths: {
      'jquery': 'jquery-1.9.1.min',
      'bootstrap': 'bootstrap.min',
      'Showdown': 'showdown',
      'chosen': 'chosen.jquery.min',
      'select2': 'select2',
      'jqBootstrapValidation': 'jqBootstrapValidation-1.3.7.min',
      'area': 'app/area',
      'underscore': 'underscore'
    }
  });

  require(['jquery', 'Showdown', 'underscore', 'area', 'bootstrap', 'chosen', 'select2', 'jqBootstrapValidation'], function($, Showdown, _, Area) {
    var converter;
    $("#tag-select").select2();
    $("#country-input").select2({
      placeholder: "选择国家",
      data: countries
    });
    $("#country-input").on("select2-close", function() {
      var country, provinces;
      $("#province-div").addClass('hidden');
      $("#province-input").select2("enable", false);
      $("#district-div").addClass('hidden');
      $("#district-input").select2("enable", false);
      $("#county-div").addClass('hidden');
      $("#county-input").select2("enable", false);
      country = $(this).val();
      console.log(country);
      provinces = _.map(Area[country].places, function(places, key) {
        return places;
      });
      if (provinces && provinces.length > 0) {
        $("#province-input").select2("enable", true);
        $("#province-input").select2({
          placeholder: "择省份，直辖市",
          data: provinces
        });
        return $("#province-div").removeClass('hidden');
      }
    });
    $("#province-input").on("select2-close", function() {
      var country, districts, province;
      $("#district-div").addClass('hidden');
      $("#county-div").addClass('hidden');
      $("#county-input").select2("enable", false);
      $("#district-input").select2("enable", false);
      country = $("#country-input").val();
      province = $(this).val();
      if (province) {
        districts = _.map(Area[country]["places"][province]["places"], function(places, key) {
          return places;
        });
      }
      if (districts && districts.length > 0) {
        $("#district-input").select2("enable", true);
        $("#district-input").select2({
          placeholder: "选择市,区",
          data: districts
        });
        return $("#district-div").removeClass('hidden');
      }
    });
    $("#district-input").on("select2-close", function() {
      var counties, country, district, province;
      $("#county-div").addClass('hidden');
      $("#county-input").select2("enable", false);
      country = $("#country-input").val();
      province = $("#province-input").val();
      district = $(this).val();
      if (district) {
        counties = _.map(Area[country]["places"][province]["places"][district]["places"], function(places, key) {
          return places;
        });
      }
      if (counties && counties.length > 0) {
        $("#county-input").select2("enable", true);
        $("#county-input").select2({
          placeholder: "选择县",
          data: counties
        });
        return $("#county-div").removeClass('hidden');
      }
      /*
      $("#province-select").empty()
      $("#province-select").select2("val", "")
      options = ""
      for province in provinces
        options += '<option value="'+province.id+'">'+province.text+'</option>'
      if options then $("#province-select").append options
      */

    });
    $("#submit-btn").click(function() {
      var content;
      content = $("#editor-area").text();
      console.log(content);
      $("#content-hidden").val(content);
      return $("#post-form").submit();
    });
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    converter = new Showdown.converter();
    return $("#editor-area").keyup(function() {
      var html, txt;
      txt = $("#editor-area").text();
      html = converter.makeHtml(txt);
      return $("#preview-content").html(html);
      /*
       $("#preview-content").html(html.replace(/>/g, ">\n").replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n"))
      */

    });
  });

}).call(this);
