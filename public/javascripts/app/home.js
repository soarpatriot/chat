$(function(){

    /**
    $('a[name="up-post"]').popover({
        animation:true,

        placement:'top',

        title:'start',
        content:'sdfend',
        delay:{ show: 5000, hide: 2000 }
    })**/

    var postData = $('#posts-data').val();
    //alert(postData);


    var Post = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot : '/posts'

    });
    var Posts = Backbone.Collection.extend({
        Model:Post,
        url: '/posts'
    });
    //Posts.fetch();


    var post = new Post();
        post.set({title:'sdfadf',content:'kaok'});

    var posts = new Posts();
    posts.fetch({url:'/posts',
        success:function(collection,response){
            collection.each(function(post){
                //alert(post.get('content'));
            })
        },
        error:function(collection, response){
            console.log(collection);
            console.log(response);
            alert('error');
        }
    });
    //alert(JSON.stringify(p));

    //posts.fetch();
    posts.add(post);
    //posts.add(postData);
   // alert(posts.at(0).pusTime);
   var post2 = new Post();
    post2.set('_id','50b775caa523bcab0a000004');
    post2.fetch({urlRoot:'/posts',
        success:function(data,response){
            //alert(JSON.stringify(response) );

            //alert(JSON.stringify(data) );

        },
        error:function(collection, response){
            console.log(collection);
            console.log(response);
            alert('error');
        }
    });

    post2.on("change", function() {
        alert(post2.get("content"));
    });




    //alert()
    posts.each(function(post){
        //alert(post.get('content'));
    });
    //alert('collection:  '+collection[0].email);
    //   alert('posts:'+ posts);
    var UpDown = Backbone.Model.extend({
        defaults:function(){
            return{
                postId:'',
                type: ''
            }
        },

        initialize: function(){


        }
        /**
         toggle: function(){
            this.save({show:!this.get("show")});
        }**/
    });
    var UpDownList = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: UpDown
    });

    var UpDowns = new UpDownList;

    var UpDownView = Backbone.View.extend({

        //statsTemplate: _.template($('#item-template').html()),

        events: {
            "click .up": "upPost"


        },
        initialize: function() {
            //alert("123");
            this.upPostLink = this.$('.up');

        },
        render: function() {

        },
        upPost: function(){
            //alert('sdfdf');
            var offset = this.upPostLink.offset();
            var postId = this.upPostLink.attr('data');
            alert('offset'+offset.top+'  postId'+postId);
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



    var HomeView = Backbone.View.extend({
        el: $("#home-div"),
        //statsTemplate: _.template($('#item-template').html()),

        events: {


        },
        initialize: function() {

            this.addAllUpAndDown();
        },
        render: function() {

        },

        addAllUpAndDown: function(){


            $("li.up-and-down").each(function(){
                //var upDown = new UpDown();
                new UpDownView().setElement($(this)) ;
            })
        }

        /**
        upPost: function(){


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
        }**/

    });

    var homeView = new HomeView();
})