/**
 * This file is used for user review the post
 * @author  Soar
 *
 */
require(["require","jquery","underscore","backbone","models","Spinner"],function(require,$,_,Backbone,Models,Spinner) {

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
            left: '0' // Left position relative to parent in px
        };

        var Post = Models.Post;

        var ReviewView  = Backbone.View.extend({

            el: $("#review-container"),

            template: _.template($('#post-template').html()),

            events: {
                "click #support": "support",
                "click #veto": "veto"
            },
            initialize: function() {
                var target= document.getElementById('spinner');
                this.spinner = new Spinner(opts).spin(target);

                this.postContent = this.$('#post-content');
                var post = new Post();
                this.model = post;
                this.model.on('change', this.render, this);

                this.fetchNew(this.spinner);
            },

            render: function() {
                //stop the spinner when obtain Post
                //this.spinner.stop();
                //console.log("sss:"+JSON.stringify( this.model));
                //if(this.model.isNew()){
                //    this.postContent.html('');
                //}else{
                    this.postContent.html(this.template(this.model.toJSON()));
                //}

                return this;

            },
            support: function(){
                this.model.set("passed",true);
                this.operation(this.model);
            },
            veto:function(){
                this.model.set("passed",false);
                this.operation(this.model);
            },

            operation:function(model){
                var result = model.save();
                if(result.readyState === 1){
                    this.fetchNew();
                }
            },

            fetchNew:function(spinner){
                this.model.fetch({url:'/posts/review',success:function(model,response){
                    spinner.stop();
                    //console.log(JSON.stringify( this.model));
                    if(null === response ){
                        //var post = new Post();
                        //post.set('title','暂么有需要审核的内容！');
                        //post.set('content','赶快发布你自己的文章把。');
                        this.model.clear();
                        //this.model.set.call(this,'title','暂么有需要审核的内容！');
                        //this.model.set.call(this, 'content','暂么有需要审核的内容！');
                        //this.model.set('title','暂么有需要审核的内容！');
                        //this.model.set('content','赶快发布你自己的文章把。');
                        //this.model.set('disabled',true);
                        //console.log(JSON.stringify( this.model));
                    }else{
                        this.model = model;
                    }
                },error:function(){
                    alert("fetch error!");
                }});
            }
        });
        var reviewView = new ReviewView();
    });

});