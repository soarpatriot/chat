/**
 * This file is used for user review the post
 * @author  Soar
 *
 */
(function(){



    $(function(){

        var Post = Backbone.Model.extend({

            idAttribute: "_id",
            urlRoot : '/posts'

        });
        //var post = new Post();


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
                this.model.on('change', this.render, this);

                this.fetchNew();
            },

            render: function() {

                this.postContent.html(this.template(this.model.toJSON()));
                return this;
            },
            support: function(){
                alert("sdf");
                this.fetchNew();
            },
            veto:function(){
                alert("sdfdf");
                this.fetchNew();
            },
            fetchNew:function(){

                this.model.fetch({url:'/posts/review/',success:function(model,response){
                    //alert('success');
                    //model为获取到的数据
                    //alert(JSON.stringify(model));
                    this.model = model;
                    //this.postContent.html(this.template(this.model.toJSON()));
                    //this.render();
                },error:function(){
                    alert(response);
                }});
            }


        });

        var reviewView = new ReviewView();


    });
})();