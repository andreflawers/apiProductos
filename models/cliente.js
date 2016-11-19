var sql = require('mssql');
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var clienteModelo= new Object();

clienteModelo.getDatosCliente= function (idUsuario,callback) {
    sql.connect(connectionString).then(function () {
        new sql.Request().query("SELECT * FROM clientes WHERE idUsuario = " +idUsuario)
        .then(function (recordset) {
            console.log('query ejecutandose : traer datos de cliente');
            callback(null,recordset);
          })
        .catch(function (err) {
            console.error(err);
          })

      }).catch(function (err) {
          console.error(err);
        });

  }

module.exports=clienteModelo;  