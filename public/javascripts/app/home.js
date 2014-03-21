
(function() {

require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

    //some special settings. like exports and dep
    shim: {

        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'backbone-pageable': {
            deps: ['backbone']
            
        },
        
        'bootstrap':{
            deps: ['jquery']
        },
        'animo':{
            deps: ['jquery']
        },
        'google-html5':{
            exports: 'google-html5'
        }

    },

    paths: {

        "models":"app/models",
        "review":"app/review",
        "user":"app/user",
        //js framework
        "underscore": "underscore",
        "backbone": "backbone",
        "backbone-pageable": "backbone-pageable.min",
        "bootstrap":"bootstrap.min",
        "bootstrapPaginator":"bootstrap-paginator.min",

        "animo":"animo",
        "jquery": "jquery-2.0.3.min",
        'google-html5':'google-code-prettify/html5'

    }

});

require(["require","jquery","underscore","backbone","models","bootstrap","bootstrapPaginator","jquery.spin","backbone-pageable","animo"],function(require,$,_,Backbone,Models) {

    var opts = {
        lines: 13, // The number of lines to draw
        length: 6, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#FFFFFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '6', // Top position relative to parent in px
        left: '-21' // Left position relative to parent in px
    };

    $('a[name="new-member-link"]').tooltip();

    var $spinner = $('<div class="spin-container"></div>');
    $spinner.spin(opts);
    $('body').append($spinner);

    $(function(){


        var posts = new Models.PostList(),
            discorverPosts = new Models.PostList({
                queryParams: {
                    tag: "discover"
                }
            }),
            //help tag
            helpPosts = new Models.PostList({
                queryParams: {
                    tag: "help"
                }
            }),
            spitslotPosts = new Models.PostList({
                queryParams: {
                    tag: "spitslot"
                }
            }),
            PostView,
            TagView,

            DiscoverView,
            NewView,
            HelpView,
            SpitslotView,

            newView,
            discoverView,
            helpView,
            spitslotView;



        PostView = Backbone.View.extend({

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
                var options ={
                    animation:true,
                    placement:'bottom',
                    title:'您已操作过或未登陆',
                    trigger:'hover click',
                    container:'body'
                };
                this.upPost = this.$('a[name="up-post"]');
                this.downPost = this.$('a[name="down-post"]');
                if(this.model.get("done")){

                    this.$('a[name="up-post"]').attr("disabled",true);
                    this.$('a[name="down-post"]').attr("disabled",true);
                    this.$('div[name="up-post-div"]').tooltip(options);
                    this.$('div[name="down-post-div"]').tooltip(options);
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
                    this.$('div[name="up-post-div"]').animo( { animation: 'tada' } );
                }else{
                    this.$('div[name="down-post-div"]').animo( { animation: 'tada' } );
                }

            },

            upPost: function(){
                if(!this.model.get("done")){
                    var upNumber = this.model.get("up")+1;
                    this.model.set("up",upNumber);
                    this.model.save();

                }
            },

            downPost:function(){
                if(!this.model.get("done")){
                    var downNumber = this.model.get("down")-1;
                    this.model.set("down",downNumber);
                    this.model.save();

                }
            }

        });

        TagView = Backbone.View.extend({

            template: _.template($('#pager-template').html()),
            events: {

            },
            initialize: function() {

                this.$pager = this.template();

                this.model.on('add', this.addOne, this);
                this.model.on('reset', this.addAll, this);
                this.model.on('all', this.render, this);

            },
            render: function() {
                $spinner.spin(false);
                return this;
                //this.$el.append(this.spinner.el);
            },
            addOne: function(post) {

                var view = new PostView({model: post});
                this.content.append(view.render().el);


            },
            page:function(page,tag){
                this.triggered = true;
                if(!page){
                    page = 1;
                }
                page = parseInt(page,10);
                console.log('page is number: '+ _.isNumber(page));
                console.log('page: '+ page + '  tag: '+tag);
                if(tag){
                    //this.model.fetch({data: {p:page,tag:tag},reset:true});
                    //this.model.getPage(page);
                    this.model.fetch({data: {p:page,tag:tag},reset:true});
                }else{
                    this.model.fetch({data: {p:page},reset:true});
                    //this.model.getPage(page);
                }

            },
            // Add all items in the **Posts** collection at once.
            addAll: function() {
                console.log("post:"+this.name);
                var that = this;
                this.content.empty();
                this.model.each(function(post){
                    that.addOne.call(that,post);
                });
                var options = {
                    currentPage: that.model.state.currentPage || 1,
                    totalPages: that.model.state.totalPages,


                    size: "normal",
                    alignment: "left",

                    pageUrl: function(type, page, current){
                        return "#"+that.name+"/"+page;
                    },
                    onPageClicked: function(e,originalEvent,type,page){
                        
                        $spinner.spin(opts);

                        that.content.empty();
                        that.model.getPage(page);

                    }
                };
                this.content.append(this.template());
                this.$('.pagination').bootstrapPaginator(options);

            }
        });

        function initView(){

            NewView =  TagView.extend({model:posts,name:'new',el: $("#new"),content:$('#new-content'),triggered:false});

            DiscoverView =  TagView.extend({model:discorverPosts,name:'discover',el: $("#discover"),content:$('#discover-content'),triggered:false});


            HelpView =  TagView.extend({model:helpPosts,name:'help',el: $("#help"),content:$('#help-content'),triggered:false});


            SpitslotView = TagView.extend({model:spitslotPosts,name:'spitslot',el: $("#spitslot"),content:$('#spitslot-content'),triggered:false});

            newView = new NewView();
            helpView = new HelpView();
            spitslotView = new SpitslotView();
            discoverView = new DiscoverView();
        };
        initView();

        if(location.href.indexOf('#')===-1){
            console.log('path name'+ location.href );
            //newView = newView || new TagView({model:posts,name:'new',content:$('#new-content')});
            newView.page(1,'');

        }

        $('#content-ul-tab a[href="#new"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            if(!newView.triggered){
                home.navigate("new", {trigger: true, replace: true})
            }else{
                $spinner.spin(false);
            }


            $(this).tab('show');

        });

        $('#content-ul-tab a[href="#discover"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            if(!discoverView.triggered){
                home.navigate("discover", {trigger: true, replace: true});
            }else{
                $spinner.spin(false);
            }

            $(this).tab('show');

        });


        $('#content-ul-tab a[href="#help"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            if(!helpView.triggered){
                home.navigate("help", {trigger: true, replace: true});
            }else{
                $spinner.spin(false);
            }

            $(this).tab('show');

        });


        $('#content-ul-tab a[href="#spitslot"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            if(!spitslotView.triggered){
                home.navigate("spitslot", {trigger: true, replace: true});
            }else{
                $spinner.spin(false);
            }

            $(this).tab('show');

        });

        var HomeSpace = Backbone.Router.extend({

            routes: {
                "new(/:page)":     "new",
                "help(/:page)":        "help",    // #help
                "spitslot(/:page)":          "spitslot",  // #post/kiwis
                "discover(/:page)":     "discover"  // #post/kiwis
            },

            new: function(page) {
                console.log('new  '+page);
                $('#content-ul-tab a[href="#new"]').tab('show');

                newView.page(page,'');
            },
            help: function(page) {
                console.log('help  '+page);
                $('#content-ul-tab a[href="#help"]').tab('show');

                helpView.page(page,'help');
            },

            spitslot: function(page) {
                console.log('spitslot  '+page);
                $('#content-ul-tab a[href="#spitslot"]').tab('show');

                spitslotView.page(page,'spitslot');
            },

            discover: function(page){
                console.log('ff  '+page);
                $('#content-ul-tab a[href="#discover"]').tab('show');

                discoverView.page(page,'discover');
            }

        });
        home =  new HomeSpace();
        Backbone.history.start();
    });

});

define("home", function(){});
}).call(this);
