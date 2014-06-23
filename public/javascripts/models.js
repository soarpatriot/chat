/**
 * This file is used for collect all the client models of projcect
 * @author  Soar
 *
 */



define(["backbone","backbone-pageable"],function(Backbone) {

    return {
        User : Backbone.Model.extend({
            idAttribute: "_id",
            urlRoot : '/users'
        }),

        Post : Backbone.Model.extend({
            idAttribute: "_id",
            urlRoot : '/posts',
            creator: this.User
        }),

        PostList : Backbone.PageableCollection.extend({
            Model:this.Post,
            url: '/posts',
            // Any `state` or `queryParam` you override in a subclass will be merged with
              // the defaults in `Backbone.PageableCollection` 's prototype.
              state: {

                // You can use 0-based or 1-based indices, the default is 1-based.
                // You can set to 0-based by setting ``firstPage`` to 0.
                firstPage: 1,
                
                lastPage:1,
                pageSize:5,
                totalPages:0,
                sortKey:"",
                order:-1,
                // Set this to the initial page index if different from `firstPage`. Can
                // also be 0-based or 1-based.
                currentPage: 1,

                // Required under server-mode
                totalRecords: 0
              },

              // You can configure the mapping from a `Backbone.PageableCollection#state`
              // key to the query string parameters accepted by your server API.
              queryParams: {

                // `Backbone.PageableCollection#queryParams` converts to ruby's
                // will_paginate keys by default.
                currentPage: "page",
                pageSize: "pageSize",
                start:"start"

              },
              parse: function(response){
                console.log(response);
                var attrs,
                    totalRecords,
                    currentPage;

                if(response.state){
                    totalRecords = response.state.totalRecords;
                    currentPage = parseInt(response.state.currentPage,10);
                    console.log("currnt page"+currentPage)
                }else{
                    totalRecords = 0;
                    currentPage = 0;
                }


                this.state.totalRecords = totalRecords;
                this.state.currentPage = currentPage;
                if( totalRecords>0 ){
                    if(totalRecords % this.state.pageSize === 0){
                        this.state.totalPages = Math.floor(totalRecords / this.state.pageSize);
                    }else{
                        this.state.totalPages = Math.floor(totalRecords / this.state.pageSize) + 1;
                    }                    
                }else{
                    this.state.totalPages = 0;
                }

                
                this.state.lastPage = this.state.totalPages;

                attrs = response.models;
                return attrs;
              }
            
        }),

        Review : Backbone.Model.extend({
            agree:false,
            reason:''
        })
    }

});

