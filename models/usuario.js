var sql = require("mssql");
var connectionString = "mssql://sa:ktbffh@localhost/productosApp"
console.log('aca');

var usuarioModelo= new Object();
console.log('y aca ? ')
usuarioModelo.getUsuarios = function (callback) {
    console.log('Aca si creo uhmm ...')
   sql.connect(connectionString).then(function () {
       console.log('tal vez conecto')
       new sql.Request().query("select *  from usuarios").then(function (recordset) 
       { 
        console.log('entro al query')
        callback(null,recordset);
        }).catch(function (err) {
            console.log(err);
          });

     }).catch(function (err) {
         console.log(err);
       });
}

module.exports=usuarioModelo;




