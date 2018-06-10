angular
    .module('myApp')
    .controller('myCtrl', myCtrl);

myCtrl.$inject = ['$scope', 'apiservice', '$http', '$resource']

function myCtrl($scope, apiservice, $http, $resource) {

    $scope.selectedToUpdate = false;

    $http.get('../usuarios/users').
        then(function (response) {
            $scope.data = response.data;
    });
    

    $scope.deleteUser = function (Id) {
        apiservice.deleteUser(Id)
        index = $scope.data.map(function (x) { return x.Id; }).indexOf(Id);
        $scope.data.splice(index, 1);
    };
  
    $scope.createUser = function () {

        var name = $scope.name;
        var lastName = $scope.lastName;
        var email = $scope.mail;
        var password = $scope.password;

        apiservice.createUser(name, lastName, email, password).
            then(function (response) {
                $http.get('../usuarios/users').
                    then(function (response) {
                        $scope.data = response.data;
                        clearValues();
                    });
            });
        
    };

    $scope.updateUser = function () {

        var id = $scope.selectedId;
        var name = $scope.name;
        var lastName = $scope.lastName;
        var email = $scope.mail;
        var password = $scope.password;

        apiservice.updateUser (id, name, lastName, email, password).
            then(function (response) {
                $http.get('../usuarios/users').
                    then(function (response) {
                        $scope.data = response.data;
                        clearValues();
                        $scope.selectedId = null;
                        $scope.selectedToUpdate = false;
                    });
            });

    };

    $scope.editUser = function (item) {

        $scope.name = item.Name;
        $scope.lastName = item.LastName;
        $scope.mail = item.Email;
        $scope.password = item.Password;
        $scope.selectedToUpdate = true;
        $scope.selectedId = item.Id;
    };

    $scope.cancelEdit = function () {
        $scope.selectedToUpdate = false;
        clearValues();
    };

    var clearValues = function () {

        $scope.name = "";
        $scope.lastName = "";
        $scope.mail = "";
        $scope.password = "";
    };

    var Init = function() {


    };

    Init();
    
}

