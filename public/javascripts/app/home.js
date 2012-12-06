$(function(){

    /**
    $('a[name="up-post"]').popover({
        animation:true,

        placement:'top',

        title:'start',
        content:'sdfend',
        delay:{ show: 5000, hide: 2000 }
    })**/

    //var postData = $('#posts-data').val();
    //alert(postData);

    var User = Backbone.Model.extend({

    });

    var user  = new User();
    var Post = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot : '/posts',
        creator: user

    });
    var PostList = Backbone.Collection.extend({
        Model:Post,
        url: '/posts'
    });

    var Posts = new PostList;

    var PostView = Backbone.View.extend({

        tagName: "div",

        template: _.template($('#item-template').html()),
        // The DOM events specific to an item.
        events: {
            "click a[name='up-post']": "upPost",
            "click a[name='down-post']": "downPost"
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function() {
            //this.upPost = this.$('a[name="up-post"]');
            //this.downPost = this.$('a[name="down-post"]');

            //this.model.on('change', this.render, this);
            //this.model.on('destroy', this.remove, this);
        },

        // Re-render the titles of the todo item.
        render: function() {
           // alert(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            //this.$el.toggleClass('done', this.model.get('done'));
            //this.input = this.$('.edit');
            this.upPost = this.$('a[name="up-post"]');
            this.downPost = this.$('a[name="down-post"]');


            return this;
        },
        upPost: function(){
            var offset = this.upPost.offset();
            alert(offset.top);
        },
        downPost:function(){
            alert('sdfsd');
        }

    });




    var NewView = Backbone.View.extend({
        el: $("#new"),

        events: {

        },
        initialize: function() {
           // this.posts = this.$('#posts');
            Posts.on('add', this.addOne, this);
            Posts.on('reset', this.addAll, this);
            Posts.on('all', this.render, this);

            Posts.fetch();
        },
        render: function() {

        },
        addOne: function(post) {
            //alert(JSON.stringify(post));

            //alert(post.comments.length);
            var view = new PostView({model: post});
            this.$('#posts').append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            Posts.each(this.addOne);
        }




    });

    var newView = new NewView();


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



    //var homeView = new HomeView();
})