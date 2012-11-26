$(function(){

    alert('sss');
    var username = $('#username-input').val();
    var password = $('#password-input').val();

    /**
    $('#login-btn').click(function(){
        if(username==='' || password===''){

        }else{
            $('#login-form').submit();
        }

    });**/


    var InfoTip = Backbone.Model.extend({
        defaults:function(){
            return{
                title:'tip',
                show: false
            }
        },

        initialize: function(){
            alert('ss');
            if(!this.get("title")){
                this.set({"title": this.defaults.title});
            }
        }
        /**
        toggle: function(){
            this.save({show:!this.get("show")});
        }**/
    });

    //var infoTip = new InfoTip;


    var infoTip = new InfoTip;
    var LoginView = Backbone.View.extend({
        el: $("#login-div"),
        statsTemplate: _.template($('#item-template').html()),

        events: {

            "click #login-btn": "login"
        },
        initialize: function() {
            this.tip = this.$('#tip');
            alert('ssssssss');
            this.render();
        },
        render: function() {

                alert('sss');
                this.tip.html(this.statsTemplate({title: "sdfadsfaldsfkjad ok okkoook okok okok "}))
                this.tip.show();
               // this.footer.html(this.statsTemplate({title: InfoTip.title}));


        },
        login: function(){
            alert("kadjfadf");
        }
    });

    var loginView = new LoginView;
})