var sql = require('mssql');
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var clienteModelo= new Object();

clienteModelo.getClientes=function (callback) {
    sql.connect(connectionString).then(function () { 
        new sql.Request().query("SELECT * FROM clientes")
        .then(function (recordset) {
            console.log('query ejecutaandose : get clientes');
            callback(null,recordset);
          })
        .catch(function (err) {
             callback(err,null);
            console.error(err);
          });
     })
    .catch(function (err) {
            callback(err,null);
            console.error(err);
      });
  }
module.exports=clienteModelo;  