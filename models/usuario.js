/// <reference path="../typings/index.d.ts" />
var sql = require("mssql");
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";
console.log('aca');

var usuarioModelo = new Object();

usuarioModelo.getUsuarios = function (callback) {

    sql.connect(connectionString).then(function () {
        
        new sql.Request().query("select *  from usuarios").then(function (recordset) {
            console.log('query ejecutando : seleccionar usuarios');
            callback(null, recordset);
        }).catch(function (err) {
            console.error(err);
        });

    }).catch(function (err) {
        console.error(err);
    });
 

}

usuarioModelo.loginUsuario = function (nombreUsuario, contrasenaUsuario, callback) {
    sql.connect(connectionString).then(function () {
        new sql.Request().query("select *  from usuarios where nombreUsuario = '" +
            nombreUsuario + "' and contrasenaUsuario = '" +
            contrasenaUsuario + "'").then(function (recordset) {
                console.log('query ejecutando : loguear usuario');
                callback(null, recordset);

            }).catch(function (err) {
                console.error(err);
            });

    }).catch(function (err) {
        console.error(err);
    });
}


module.exports = usuarioModelo;




