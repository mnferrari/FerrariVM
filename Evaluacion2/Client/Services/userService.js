
//creacion de servicio
angular
    .module('myApp')
    .factory('apiservice', apiservice);

//inyeccion
apiservice.$inject = ['$http'];

function apiservice($http) {
    return {
        getAllUsers: function () {
            $http.get("../usuarios/users/")
                .then(function (response) {
                    console.log(response.data);
                });
        },

        createUser: function (name, lastName, email, password) {
            data = '{"name":"' + name + '","lastName":"' + lastName + '","email":"' + email + '","password":"' + password + '"}';
            return $http.post("../usuarios/users/", data)
                .then(function (response) {
                    console.log("User added");
                });
        },

        updateUser: function (id, name, lastName, email, password) {
            data = '{"id":"' + id + '","name":"' + name + '","lastName":"' + lastName + '","email":"' + email + '","password":"' + password + '"}';
            return $http.put("../usuarios/users/", data)
                .then(function (response) {
                    console.log("User Updated");
                });
        },

        deleteUser: function (Id) {
            return $http.delete("../usuarios/users/" + Id)
                .then(function (response) {
                    console.log("User Deleted");
                });
        }
        
    }
}