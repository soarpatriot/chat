(function(){
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
                this.model.on('change:up', this.up, this);
                this.model.on('change:down', this.down, this);
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

            // up and down the post action
            up: function(){

                this.model.set("done",true);
                this.render();

                //after post was uped, display an animation
                this.optAnimation();
            },
            down: function(){

                this.model.set("done",true);
                this.render();

                //after post was uped, display an animation
                this.optAnimation();
            },

            //animateion, after post was up or down
            optAnimation: function(){
                var offset = this.upPost.offset();

                this.$upDownCover= $('<div class="up-down-cover">顶 +1</div>');
                var top = offset.top;
                var left = offset.left;

                var linkHalfHeight = 15;
                var linkHalfWidth = 50;

                var targetTop = top - linkHalfHeight;
                var targetLeft = left - linkHalfWidth;
                this.$el.append(this.$upDownCover);
                this.$upDownCover.css('width','100px');
                this.$upDownCover.css('height','30px');
                this.$upDownCover.css('font-size','20px');
                this.$upDownCover.css('padding-top','10px');
                this.$upDownCover.css('display','none');
                this.$upDownCover.css('opacity', '1');
                this.$upDownCover.css('top', top);
                this.$upDownCover.css('left', left);
                this.$upDownCover.css('display', 'block');

                this.$upDownCover.animate({

                    'font-size': "30px",
                    opacity: "0.5"
                }, 1000).fadeOut(2000);

            },

            upPost: function(){
                if(!this.model.get("done")){
                    //alert(JSON.stringify(model));
                    var upNumber = this.model.get("up")+1;
                    this.model.save({"up":upNumber});
                    this.model.fetch();
                }
            },

            downPost:function(){
                if(!this.model.get("done")){
                    //alert(JSON.stringify(model));
                    var downNumber = this.model.get("down")+1;
                    this.model.save({"down":downNumber});
                    this.model.fetch();
                }
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
    });
})();
