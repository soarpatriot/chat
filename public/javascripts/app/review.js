/**
 * This file is used for user review the post
 * @author  Soar
 *
 */


$(function(){

    var ReviewView  = Backbone.View.extend({

        el: $("#review-container"),

        template: _.template($('#post-template').html()),

        events: {
            "click #support": "support",
            "click #veto": "veto"
        },
        initialize: function() {

            this.postContent = this.$('#post-content');
            var post = new Post();
            this.model = post;
            this.model.on('change', this.render, this);

            this.fetchNew();
        },

        render: function() {

            if(this.model.isNew()){
                this.postContent.html('');
            }else{
                this.postContent.html(this.template(this.model.toJSON()));
            }

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

        fetchNew:function(){
            this.model.fetch({url:'/posts/review',success:function(model,response){
                if(null === response){
                    this.model.clear();
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
