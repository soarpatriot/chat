


require(["underscore","jquery","backbone","models"],function(_,$,Backbone,Models) {

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

        });

        var infoTip = new InfoTip;

        /**
         * user login view,
         * check username and password
         *
        * */
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
                    this.tip.addClass('alert alert-warning');

                }else{
                    this.tip.text("");
                    this.tip.removeClass('alert alert-warning');

                }

            },
            login: function(){

                if(this.username.val()==='' || this.passwordIn.val()===''){
                    var title = '';
                    var content = '用户名密码不能为空！';
                    this.tip.html(this.statsTemplate({title: title,content:content}));
                    this.tip.addClass('alert alert-warning');

                }else if(this.username.val().length > 50 || this.passwordIn.val().length > 30){
                    var content = '用户名或密码过长！';
                    this.tip.html(this.statsTemplate({title: title,content:content}));
                    this.tip.addClass('alert alert-warning');
                }else{
                    this.tip.text("");
                    this.tip.removeClass('alert alert-warning');
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
                    this.tip.text("");
                    this.tip.removeClass('alert alert-warning');
                }
            }
        });

        var loginView = new LoginView;
    });

});