var sql = require('mssql');
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var productoModelo=new Object();
productoModelo.getProductos= function (callback) {
    sql.connect(connectionString).then(function () {
        new sql.Request().query("select * from productos").then(function (recordset) {
            console.log('query ejecutando : seleccionar productos')
            callback(null,recordset);
          }).catch(function (err) {
              console.error(err);
            });

      }).catch(function (err) {
          console.error(err);
        });
  }

  module.exports=productoModelo;