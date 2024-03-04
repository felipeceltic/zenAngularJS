(function () {
  'use strict';

  angularjs.controller('angularjs', ['$scope', 'zendeskService', function ($scope, zendeskService) {

    //Inicia PROCURAR USUÁRIO!!!

    document.getElementById('searchUserForm').addEventListener('submit', function (event) {
      event.preventDefault()

      var userName = document.getElementById('userName').value;

      zendeskService.searchUser(userName).then(function (user) {
        $scope.user = user;
        document.getElementById('showUser').hidden = false;

        user.users.forEach(element => {
          var listItem = document.createElement('li')
          listItem.classList.add('list-group-item');
          listItem.id = element.id;

          var divContainer = document.createElement('div');
          divContainer.textContent = 'E-mail: ' + element.email;

          var divSubContainer = document.createElement('div');
          divSubContainer.classList.add('fw-bold');
          divSubContainer.textContent = 'Nome: ' + element.name

          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Remove da lista';
          deleteButton.classList.add('btn');
          deleteButton.classList.add('btn-danger');
          deleteButton.addEventListener('click', function (event) {
            event.preventDefault();

            document.getElementById(element.id).remove();
          })

          listItem.appendChild(divSubContainer);
          listItem.appendChild(divContainer);
          listItem.appendChild(deleteButton);

          usersList.appendChild(listItem);
        });
      });

    });

    //Finaliza PROCURAR USUÁRIO!!!

    //Inicia CONTAR USUÁRIOS!!!

    document.getElementById('countUserForm').addEventListener('submit', function (event) {
      event.preventDefault()

      zendeskService.countUsers().then(function (count) {
        $scope.count = count.count;
        document.getElementById('showCount').hidden = false;
        //console.log(count);
      });

    });

    //Finaliza CONTAR USUÁRIOS!!!


    document.getElementById('createCustomOBJForm').addEventListener('submit', function (event) {
      event.preventDefault()

      var objKey = document.getElementById('objKey').value;
      var objTitle = document.getElementById('objTitle').value;
      var objTitlePlu = document.getElementById('objTitlePlu').value;

      const data = {
        "custom_object": {
          "key": objKey,
          "title": objTitle,
          "title_pluralized": objTitlePlu
        }
      };

      zendeskService.createCustomObj(data).then(function (data) {
        $('#customSuccess').modal('show');
      }).catch(function (error) {
        console.log(error.responseJSON.details.base[0].description);
        document.getElementById('customFailButton').textContent = error.responseJSON.details.base[0].description;
        $('#customFail').modal('show');
      });

      // console.log(objKey);
      // console.log(objTitle);
      // console.log(objTitlePlu);
    });

  }]);

})();