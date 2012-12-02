$(function(){

    /**
    $('a[name="up-post"]').popover({
        animation:true,

        placement:'top',

        title:'start',
        content:'sdfend',
        delay:{ show: 5000, hide: 2000 }
    })**/
    var UpDownView = Backbone.View.extend({
        el: $("li.up-and-down"),
        //statsTemplate: _.template($('#item-template').html()),

        events: {
            "click .up": "upPost"


        },
        initialize: function() {
            alert("sdfljhlsdf");
            this.upPostLink = this.$('.up');

        },
        render: function() {

        },
        upPost: function(){

            var offset = this.upPostLink.offset();
            alert('offset'+offset.top);
            //$("a[name='up-post']").popover('show');
            //$('#divPop').popover('show');
            /**
             $("#divPop").addClass('up-down-show');
             //$("#divPop").css('position',)
             $("#divPop") .animate({
                "opacity": "hide",
                "width": $(window).width()-100,
                "height": $(window).height()-100,
                "font-size":"50px"
            }, 500 );**/

        }


    });

    var upDownView = new UpDownView();
    /**
    var HomeView = Backbone.View.extend({
        el: $("#home-div"),
        //statsTemplate: _.template($('#item-template').html()),

        events: {
            "click a[name='up-post']": "upPost",
            "click a[name='down-post']": "downPost"

        },
        initialize: function() {


        },
        render: function() {

        },
        upPost: function(){

            var offset = $("a:last").offset();
            alert('offset'+offset.top);
            //$("a[name='up-post']").popover('show');
            //$('#divPop').popover('show');

            $("#divPop").addClass('up-down-show');
            //$("#divPop").css('position',)
            $("#divPop") .animate({
                "opacity": "hide",
                "width": $(window).width()-100,
                "height": $(window).height()-100,
                "font-size":"50px"
            }, 500 );

        },
        downPost: function(){
            alert('sdf');
        }

    });

    var homeView = new HomeView();**/
})