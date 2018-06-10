//creacion de controlador
angular
    .module('app')
    .controller('myCtrl', myCtrl);

//inyeccion
myCtrl.$inject = ['$scope', 'apiservice']

//declaracion de metodos y propiedades

function myCtrl($scope, apiservice) {
    $scope.setInfoLocalFromWeb = function () {
        apiservice.setInfoLocalFromWeb('dolar');
    }
    $scope.haceCuantoTiempo = function () {
        //obtencion de datos
        var referencia = 1493099024124;
        var stamp = new Date();
        //parse de tiempo
        var haceSegundos = Math.round((stamp.getTime() - referencia) / 1000);
        var haceMinutos = Math.round((stamp.getTime() - referencia) / 60000);
        var haceHoras = Math.round((stamp.getTime() - referencia) / 1440000);
        //estructura de control
        if (haceSegundos < 60) {
            //console.log(haceSegundos);
            return haceSegundos + ' segundos';
        } else{
            if (haceMinutos<60){
                //console.log(haceMinutos);
                return haceMinutos + ' minutos';
            }
            else {
                //console.log(haceHoras);
                return haceHoras + ' horas';
            }
        }
        
    }
    
 }