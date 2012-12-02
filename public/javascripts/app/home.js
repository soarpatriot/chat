$(function(){


    var InfoTip = Backbone.Model.extend({
        defaults:function(){
            return{
                title:'tip',
                show: false
            }
        },

        initialize: function(){

            if(!this.get("title")){
                this.set({"title": this.defaults.title});
            }
        }
        /**
         toggle: function(){
            this.save({show:!this.get("show")});
        }**/
    });




    var infoTip = new InfoTip;
    var HomeView = Backbone.View.extend({
        el: $("#home-div"),
        //statsTemplate: _.template($('#item-template').html()),

        events: {
            "click a[name='up-post']": "upPost",
            "click a[name='down-post']": "downPost"

        },
        initialize: function() {


        },
        render: function() {

        },
        upPost: function(){
            alert('sdfsssss');
        },
        downPost: function(){
            alert('sdf');
        }

    });

    var homeView = new HomeView();
})