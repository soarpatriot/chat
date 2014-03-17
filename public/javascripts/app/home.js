
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




        var Posts = new Models.PostList();

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

        var NewView = Backbone.View.extend({
            el: $("#new"),
            template: _.template($('#pager-template').html()),
            events: {

            },
            initialize: function() {

                this.$pager = this.template();

                Posts.on('add', this.addOne, this);
                Posts.on('reset', this.addAll, this);
                Posts.on('all', this.render, this);

            },
            render: function() {
                $spinner.spin(false);
                //this.$el.append(this.spinner.el);
            },
            addOne: function(post) {
                var view = new PostView({model: post});
                this.$('#posts').append(view.render().el);

            },
            page:function(page){
                if(!page){
                    page = 1;
                }
                console.log('page: '+ page);
                Posts.fetch({data: {p:page}});
            },
            // Add all items in the **Posts** collection at once.
            addAll: function() {
                //console.log("post:"+JSON.stringify(Posts.state));
                
                Posts.each(this.addOne);
                var that = this;
                options = {
                    currentPage: Posts.state.currentPage,
                    totalPages: Posts.state.totalPages,
                    size: "normal",
                    alignment: "right",

                    pageUrl: function(type, page, current){
                        return "#new/"+page;
                    },
                    onPageClicked: function(e,originalEvent,type,page){
                        
                        $spinner.spin(opts);

                        $('#posts').empty();
                        Posts.getPage(page)

                    }
                };
                this.$('#posts').append(this.template());
                //$('#pagination-div').bootstrapPaginator(options);
                this.$('.pagination').bootstrapPaginator(options);

            }
        });

        //exetend models query params, add tag
        var discorverPosts = new Models.PostList({
                queryParams: {
                    tag: "discover"
                }
            });
           
        var DiscoverView = Backbone.View.extend({
            el: $("#discover"),
            template: _.template($('#pager-template').html()),
            events: {

            },
            initialize: function() {

                discorverPosts.on('add', this.addOne, this);
                discorverPosts.on('reset', this.addAll, this);
                discorverPosts.on('all', this.render, this);

                
            },
            render: function() {
                $spinner.spin(false);


            },
            addOne: function(post) {
                console.log("addOne  fff");
                var view = new PostView({model: post});
                this.$('#discover-content').append(view.render().el);

                var options = {
                    currentPage: discorverPosts.state.currentPage,
                    totalPages: discorverPosts.state.totalPages,
                    size: "normal",
                    alignment: "right",
                    tag: 'discover',
                    pageUrl: function(type, page, current){
                        return "#discover/"+page;
                    },
                    onPageClicked: function(e,originalEvent,type,page){

                        $spinner.spin(opts);

                        $('#discover-content').empty();
                        discorverPosts.getPage(page,{data: {tag: 'discover'}})

                    }
                };


                    this.$('#discover-content').append(this.template());
                    this.$('.pagination').bootstrapPaginator(options);


            },
            page:function(page){
                if(!page){
                    page = 1;
                }
                discorverPosts.fetch({data: {tag: 'discover',p:page}})
            },

            // Add all items in the **Posts** collection at once.
            addAll: function() {
                console.log("add all  fff");
                discorverPosts.each(this.addOne);


            }
        });


        //help tag
        var helpPosts = new Models.PostList({
            queryParams: {
                tag: "help"
            }
        });

        var HelpView = Backbone.View.extend({
            el: $("#help"),
            template: _.template($('#pager-template').html()),
            events: {

            },
            initialize: function() {

                helpPosts.on('add', this.addOne, this);
                helpPosts.on('reset', this.addAll, this);
                helpPosts.on('all', this.render, this);


            },
            render: function() {
                $spinner.spin(false);
            },
            addOne: function(post) {
                var view = new PostView({model: post});
                this.$('#help-content').append(view.render().el);

            },
            page:function(page){
                if(!page){
                    page = 1;
                }
                helpPosts.fetch({data: {tag: 'help',page:page}});
            },
            // Add all items in the **Posts** collection at once.
            addAll: function() {
                console.log("add all");
                helpPosts.each(this.addOne);
                var that = this;
                options = {
                    currentPage: helpPosts.state.currentPage,
                    totalPages: helpPosts.state.totalPages,
                    size: "normal",
                    alignment: "right",
                    tag: 'help',
                    pageUrl: function(type, page, current){
                        return "#help/"+page;
                    },
                    onPageClicked: function(e,originalEvent,type,page){

                        $spinner.spin(opts);

                        $('#help-content').empty();
                        helpPosts.getPage(page,{data: {tag: 'help'}})

                    }
                };
                this.$('#help-content').append(this.template());
                this.$('.pagination').bootstrapPaginator(options);

            }
        });

        //help tag
        var spitslotPosts = new Models.PostList({
            queryParams: {
                tag: "spitslot"
            }
        });

        var SpitslotView = Backbone.View.extend({
            el: $("#spitslot"),
            template: _.template($('#pager-template').html()),
            events: {

            },
            initialize: function() {
                //defin a spinner init
                //var target= document.getElementById('spinner');
                //this.spinner = new Spinner(opts).spin(target);

                spitslotPosts.on('add', this.addOne, this);
                spitslotPosts.on('reset', this.addAll, this);
                spitslotPosts.on('all', this.render, this);

            },
            render: function() {
                $spinner.spin(false);
            },
            addOne: function(post) {
                var view = new PostView({model: post});
                this.$('#spitslot-content').append(view.render().el);

            },
            page:function(page){
                if(!page){
                    page = 1;
                }
                spitslotPosts.fetch({data: {tag: 'spitslot',page:page}});
            },
            // Add all items in the **Posts** collection at once.
            addAll: function() {

                spitslotPosts.each(this.addOne);
                var that = this;
                options = {
                    currentPage: spitslotPosts.state.currentPage,
                    totalPages: spitslotPosts.state.totalPages,
                    size: "normal",
                    alignment: "right",
                    tag: 'spitslot',
                    pageUrl: function(type, page, current){
                        return "#spitslot/"+page;
                    },
                    onPageClicked: function(e,originalEvent,type,page){

                        $spinner.spin(opts);

                        $('#spitslot-content').empty();
                        spitslotPosts.getPage(page,{data: {tag: 'spitslot'}})

                    }
                };
                this.$('#spitslot-content').append(this.template());
                this.$('.pagination').bootstrapPaginator(options);

            }
        });

        //$('#content-ul-tab a[href="#new"]').tab('show');
        //var newView = new NewView();

        var discoverView = null;
        var helpView = null;
        var spitslotView = null;

        $('#content-ul-tab a[href="#discover"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            home.navigate("discover", {trigger: true, replace: true});
            $(this).tab('show');
            if(!discoverView){
                discoverView = new DiscoverView();
                discoverView.page(1);
            }else{
                $spinner.spin(false);
            }
        });


        $('#content-ul-tab a[href="#help"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();

            home.navigate("help", {trigger: true, replace: true});
            $(this).tab('show');
            if(!helpView){
                helpView = new HelpView();
                helpView.page(1);
            }else{
                $spinner.spin(false);
            }
        });


        $('#content-ul-tab a[href="#spitslot"]').click(function (e) {
            $spinner.spin(opts);
            e.preventDefault();
            home.navigate("spitslot", {trigger: true, replace: true});
            $(this).tab('show');
            if(!spitslotView){
                spitslotView = new SpitslotView();
                spitslotView.page(1);
            }else{
                $spinner.spin(false);
            }
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
                newView = new NewView();
                newView.page(page);
            },
            help: function(page) {
                console.log('help  '+page);
                $('#content-ul-tab a[href="#help"]').tab('show');
                helpView = new HelpView();
                helpView.page(page);
            },

            spitslot: function(page) {
                console.log('spitslot  '+page);
                $('#content-ul-tab a[href="#spitslot"]').tab('show');
                spitslotView = new SpitslotView();
                spitslotView.page(page);
            },

            discover: function(page){
                console.log('ff  '+page);
                $('#content-ul-tab a[href="#discover"]').tab('show');
                discoverView = new DiscoverView();
                discoverView.page(page);
            }

        });
        home =  new HomeSpace();
        Backbone.history.start();
    });

});

define("home", function(){});
}).call(this);
