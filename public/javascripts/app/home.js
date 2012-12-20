$(function(){

    /**
     $('a[name="up-post"]').popover({
        animation:true,

        placement:'top',

        title:'start',
        content:'sdfend',
        delay:{ show: 5000, hide: 2000 }
    })**/


    var User = Backbone.Model.extend({

    });

    var user  = new User();
    var Post = Backbone.Model.extend({
        done:"",
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
            "click a[name='up-post'][disabled!=true]": "upPost",
            "click a[name='down-post']": "downPost"
        },


        // app, we set a direct reference on the model for convenience.
        initialize: function() {

            this.$el.html(this.template(this.model.toJSON()));
            //this.upPost = this.$('a[name="up-post"]');
            //this.downPost = this.$('a[name="down-post"]');
            this.$upDownCover= $('<div class="up-down-cover">顶 +1</div>');
            this.$el.append(this.$upDownCover);
            this.model.on('change:up', this.up, this);

            //this.listenTo(this.model, 'save', this.up);
            //this.model.on('destroy', this.remove, this);
            //this.upDownCover = $upDownCover;
            //this.listenTo(this.model, 'change', this.render);
            //this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the todo item.
        render: function() {
            //alert(JSON.stringify(this.model));
            this.$el.html(this.template(this.model.toJSON()));
            //this.$el.toggleClass('done', this.model.get('done'));
            //this.input = this.$('.edit');


            this.upPost = this.$('a[name="up-post"]');
            this.downPost = this.$('a[name="down-post"]');
            if(this.model.get("done")){


                this.$('a[name="up-post"]').attr("disabled",true);
                this.$('a[name="down-post"]').attr("disabled",true);


            }

            return this;
        },

        up: function(){
            //alert(this.model.get("up"));

            this.model.set("done",true);

            this.render();

        },
        upPost: function(){

            if(!this.model.get("done")){
                var offset = this.upPost.offset();
                //this.$el.remove($upDownCover);

                var $upDownCover= $('<div class="up-down-cover">顶 +1</div>');
                var top = offset.top;
                var left = offset.left;

                var linkHalfHeight = 15;
                var linkHalfWidth = 50;

                var targetTop = top - linkHalfHeight;
                var targetLeft = left - linkHalfWidth;
                this.$el.append($upDownCover);
                $upDownCover.css('width','100px');
                $upDownCover.css('height','30px');
                $upDownCover.css('font-size','20px');
                $upDownCover.css('padding-top','10px');
                //$upDownCover.css('padding-bottom','7.5px');
                $upDownCover.css('display','none');
                $upDownCover.css('opacity', '1');
                $upDownCover.css('top', top);
                $upDownCover.css('left', left);
                $upDownCover.css('display', 'block');


                $upDownCover.animate({

                    'font-size': "30px",
                    opacity: "0.5"
                }, 1000).fadeOut(1000,function(){
                            alert("sdf");
                            model.save();
                            model.fetch();

                    });



            }


        },
        downPost:function(){

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


            var view = new PostView({model: post});
            this.$('#posts').append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            Posts.each(this.addOne);
        }




    });

    var newView = new NewView();



})