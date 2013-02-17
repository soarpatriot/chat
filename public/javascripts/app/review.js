/**
 * This file is used for user review the post
 * @author  Soar
 *
 */


$(function(){

    var Post = Backbone.Model.extend({

        idAttribute: "_id",
        urlRoot : '/posts'

    });

    var Review = Backbone.Model.extend({
        agree:false,
        reason:''
    });

    var ReviewView  = Backbone.View.extend({

        el: $("#review-container"),

        template: _.template($('#post-template').html()),

        events: {
            "click #support": "support",
            "click #veto": "veto"
        },
        initialize: function() {

            this.postContent = this.$('#post-content');
            //this.model.on('all', this.render, this);
            var post = new Post();
            this.model = post;
            //this.score = this.model.get('score');
            this.model.on('change:_id', this.render, this);

            this.fetchNew();
        },

        render: function() {

            this.postContent.html(this.template(this.model.toJSON()));
            return this;
        },
        support: function(){
            //this.score = this.score + 1;
            var score = this.model.get('score')+1;
            this.model.set("score",score);
            this.model.save();
            this.fetchNew();
        },
        veto:function(){
            var score = this.model.get('score')-1;
            this.model.set("score",score);
            this.model.save();

            this.fetchNew();
        },
        fetchNew:function(){

            this.model.fetch({url:'/posts/review',success:function(model,response){

                this.model = model;

            },error:function(){
                alert("fetch error!");
            }});
        }
    });
    var reviewView = new ReviewView();
});
