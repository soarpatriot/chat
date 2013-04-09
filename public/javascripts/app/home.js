require(["require","jquery","underscore","backbone","models","bootstrap"],function(require,$,_,Backbone,Models) {


    $(function(){

        var opts = {
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '100', // Top position relative to parent in px
            left: '100' // Left position relative to parent in px
        };

        var Posts = new Models.PostList;

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
                this.optAnimation("up");

            },
            down: function(){

                this.model.set("done",true);
                this.render();

                //after post was downed, display an animation
                this.optAnimation("down");

            },

            //animateion, after post was up or down
            optAnimation: function(upOrDown){

                if(upOrDown==="up"){
                    var offset = this.upPost.offset();
                    this.$upDownCover= $('<div class="up-down-cover"> +1</div>');
                }else{
                    var offset = this.downPost.offset();
                    this.$upDownCover= $('<div class="up-down-cover"> -1</div>');
                }

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
                    var upNumber = this.model.get("up")+1;
                    this.model.set("up",upNumber);
                    this.model.save();

                    //alert(this.model.get("creator").get("_id"));
                    //this.model.fetch();
                }
            },

            downPost:function(){
                if(!this.model.get("done")){
                    var downNumber = this.model.get("down")-1;
                    this.model.set("down",downNumber);
                    this.model.save();
                    //this.model.fetch();
                }
            }

        });

        var NewView = Backbone.View.extend({
            el: $("#new"),

            events: {

            },
            initialize: function() {
                //var spin = document.getElementById('foo');
                //var target = document.getElementById('new');
                //var spinner = new Spinner(opts).spin($("#foo"));
                //var spinner = new Spinner(opts).spin(spin);
                //target.appendChild(spinner.el);
                //this.$cover= $('<div></div>');


                //this.spinner = new Spinner(opts).spin();
                //this.render();
                //this.$cover.append(this.spinner.el);
                //this.$el.append(this.spinner.el);
                Posts.on('add', this.addOne, this);
                Posts.on('reset', this.addAll, this);
                Posts.on('all', this.render, this);

                Posts.fetch();
                //
            },
            render: function() {
                //this.$el.append(this.spinner.el);
            },
            addOne: function(post) {
                var view = new PostView({model: post});
                this.$('#posts').append(view.render().el);
            },

            // Add all items in the **Posts** collection at once.
            addAll: function() {
                //this.spin.remove();
                //this.spinner.stop();

                Posts.each(this.addOne);
            }
        });

        var newView = new NewView();

    });

});

define("home", function(){});
