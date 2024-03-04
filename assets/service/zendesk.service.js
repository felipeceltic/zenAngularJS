(function () {
  'use strict';

  angularjs.service('zendeskService', ["$q", function ($q) {

    var client = ZAFClient.init();

    return {

      searchUser: function (userName) {
        console.log(userName);
        var deferred = $q.defer();
        client.request({
          url: '/api/v2/users/autocomplete?name={'+userName+'}',
          type: 'GET',
          contentType: 'application/json',
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error){
          deferred.reject(error)
        })
        return deferred.promise;
      },

      countUsers: function () {
        var deferred = $q.defer();
        client.request({
          url: '/api/v2/users/count',
          type: 'GET',
          contentType: 'application/json',
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error){
          deferred.reject(error)
        })
        return deferred.promise;
      },

      createCustomObj: function (data) {
        var deferred = $q.defer();

        client.request({
          url: '/api/v2/custom_objects',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
        }).then(function(response) {
          deferred.resolve(response);
          console.log(response);
        }).catch(function(error) {
          deferred.reject(error)
          console.error(error);
        });
        return deferred.promise;
      },

      listCustomObj: function () {
        var deferred = $q.defer();

        client.request({
          url: '/api/v2/custom_objects',
          type: 'GET',
          contentType: 'application/json'
        }).then(function(response) {
          deferred.resolve(response);
          //console.log(response);
        }).catch(function(error) {
          deferred.reject(error)
          //console.error(error);
        });
        return deferred.promise;
      }
    }
  
  }])

})();