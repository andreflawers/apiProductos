var sql = require('mssql')
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var subOrdenModelo = new Object();

subOrdenModelo.getSubOrden=function (idOrden,callback) { 
    sql.connect(connectionString).then(function () { 
        new sql.Request().query("SELECT idSuborden , nombreProducto , precioProducto , cantidad , descuento , subtotal FROM subOrden s inner join productos p on s.idProducto = p.idProducto WHERE s.idOrden=" +idOrden)
        .then(function (recordset) {
                console.log('query ejecutandose :  traer orden de id : ' +idOrden);
                callback(null,recordset);
          }).catch(function (err) {
              console.error(err);
              callback(err,null);
            });
     }).catch(function (err) {
         console.error(err,null);
       });
 }

 module.exports=subOrdenModelo;