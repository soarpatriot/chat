(function(){require.config({baseUrl:"/javascripts",shim:{bootstrap:{deps:["jquery"]},underscore:{exports:"_"}},paths:{jquery:"jquery-1.9.1.min",bootstrap:"bootstrap.min",jqBootstrapValidation:"jqBootstrapValidation-1.3.7.min",underscore:"underscore"}}),require(["jquery","underscore","bootstrap","jqBootstrapValidation"],function(e,t){return e("input,select,textarea").not("[type=submit]").jqBootstrapValidation()})}).call(this);