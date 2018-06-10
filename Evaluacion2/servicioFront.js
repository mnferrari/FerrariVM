//creacion de servicio
angular
    .module('app')
    .factory('apiservice', apiservice);

//inyeccion
apiservice.$inject = ['$http'];

function apiservice($http) {
    return {
        setInfoLocalFromWeb: function (aux) {
            $http.get("./Cotizacion.svc/"+aux)
            .then(function (response) {
                //preparacion de stampa de tiempo
                var tiempo = new Date();
                var stamp = tiempo.getTime();
                //obtencion de data
                var data = $.xml2json(response.data);
                var cadenaObjeto = '{"registro":{"actualizacion":"' + data.moneda.Actualizacion + '","PrecioCompra":"' + data.moneda.PrecioCompra + '","PrecioVenta":"' + data.moneda.PrecioVenta + '"}}';
                console.log(cadenaObjeto);

                //console.log(cadenaObjeto);
                var data = JSON.parse(cadenaObjeto);
                //console.log(data);
                data = JSON.stringify(data);
                //console.log(data);

                //comprobacion de objeto en localstorage
               //----condicion de existencia de registro
                if (localStorage.DataStorage.length > 0) {
                    //{"registro":{"actualizacion":"Actualizada al 24/4/2017 15:00","PrecioCompra":"15.350","PrecioVenta":"15.750"}}
                }
                //---condicion de inexistencia de registro
                else{

                }

                //almacenamiento en memoria local
                localStorage.setItem('DataStorage',data);
                console.log(localStorage.DataStorage);
                //data = JSON.parse(data);
            });
        }
    }
}
                


    
    
