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
    var LoginView = Backbone.View.extend({
        el: $("#login-div"),
        statsTemplate: _.template($('#item-template').html()),

        events: {
            "blur #username-input":  "checkUsername",
            "blur #password-input":  "checkPass",
            "click #login-btn": "login"
        },
        initialize: function() {
            this.errorHidden = this.$('#error-hidden');
            this.tip = this.$('#tip');
            this.username = this.$('#username-input');
            this.passwordIn = this.$('#password-input');
            this.render();
        },
        render: function() {
            if(this.errorHidden.val()!==''){
                var title = '';
                var content = this.errorHidden.val();
                this.tip.html(this.statsTemplate({title: title,content:content}));
                this.tip.addClass('alert alert-error tip-error');
                this.tip.show();
            }else{
                this.tip.hide();
            }


            // this.footer.html(this.statsTemplate({title: InfoTip.title}));
        },
        login: function(){
            if(this.username.val()==='' || this.passwordIn.val()===''){
                var title = '';
                var content = '用户名密码不能为空！';
                this.tip.html(this.statsTemplate({title: title,content:content}));
                this.tip.addClass('alert alert-error tip-error');
                this.tip.show();
                //alert("sdf");
            }else{
                $('#login-form').submit();
            }

        },
        checkUsername: function(){
            this.checkForShow(this.username.val());
        },
        checkPass: function(){
            this.checkForShow(this.passwordIn.val());
        },
        checkForShow: function(value){
            if($.trim(value)!==''){
                this.tip.hide();
            }
        }
    });

    var loginView = new LoginView;
})