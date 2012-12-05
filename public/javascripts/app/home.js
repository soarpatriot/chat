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

    /**
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
    });**/
    //alert(JSON.stringify(p));

    //posts.fetch();

    //posts.add(postData);
   // alert(posts.at(0).pusTime);
        /**
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




    posts.on("fetch", function() {
        this.each(function(post){
            alert(post.get('content'));
        });
    },this);**/

    //alert()

    //alert('collection:  '+collection[0].email);
    //   alert('posts:'+ posts);


    var NewView = Backbone.View.extend({
        el: $("#new"),

        events: {
            "click a[name='up-post']": "upPost",
            "click a[name='down-post']": "downPost"
        },
        initialize: function() {
            this.up = $('a[name="up-post"]');
            this.down = $('a[name="down-post"]');
        },
        render: function() {

        },
        upPost: function(){

        },
        downPost:function(){

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
        addOne: function(post) {
            var view = new NewView({model: post});
            this.$("#new").append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            Todos.each(this.addOne);
        },
        addAllUpAndDown: function(){


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