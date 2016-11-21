var sql = require('mssql');
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var empleadoModelo= new Object();


empleadoModelo.getEmpleado= function (idUsuario,callback) {
    sql.connect(connectionString).then(function () {
        new sql.Request().query("SELECT * FROM empleados WHERE idUsuario ="+idUsuario)
        .then(function (recordset) { 
            console.log('query ejecutandose : traer datos de empleado');
            callback(null,recordset);
         })
        .catch(function (err) { 
            callback(err,null);
            console.error(err);
         } );
      }).catch(function (err) {
        callback(err,null);
        console.error(err);
      });
  }
  module.exports=empleadoModelo;