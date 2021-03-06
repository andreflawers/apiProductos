var sql = require('mssql');
var connectionString ="mssql://mainuser:(developer123)@productosapp.database.windows.net:1433/productosapp?encrypt=true";

var ordenModelo = new Object();

ordenModelo.postOrden= function (data,callback) {
    sql.connect(connectionString).then(function () { 
       var Request= new sql.Request()
        Request.output('idGenerado',sql.Int)
        Request.input('fechaOrden',sql.DATE,data.fechaOrden)
        Request.input('costoOrden',sql.Decimal(10,4),data.costoOrden)
        Request.input('descuentoOrden',sql.Decimal(10,4),data.descuentoOrden)
        Request.input('totalOrden',sql.Decimal(10,4),data.totalOrden)
        Request.input('idCliente',sql.Int,data.idCliente)
        Request.input('idEmpleado',sql.Int,data.idEmpleado)
        Request.input('locacionOrden',sql.VarChar(300),data.locacionOrden)
        Request.execute('SP_insertarPedido').then(function (error,recordset) {

            console.log("respuesta : ");
            console.log(Request.parameters.idGenerado.value);
            var idOrden = Request.parameters.idGenerado.value; 
            for(var i=0 ; i<data.Detalles.length;i++)
            {
                var subOrden = data.Detalles[i];
                console.log("subOrden " + i +" : "+ subOrden.subTotal);
                new sql.Request().query("Insert into suborden values ("+
                                        idOrden+","+
                                        subOrden.idProducto+","+
                                        subOrden.cantidad+","+
                                        subOrden.descuento+","+
                                        subOrden.subTotal+")").then( function (recordset) {
                                            
                                          }).catch(function (err) {
                                            console.error(err);
                                          });
            }            
          callback(null,recordset);           
          });          
          
     }).catch(function (err) {  
//         console.error(err);
     });
}

ordenModelo.getOrdenes=function (callback) {
  sql.connect(connectionString).then(function () {
    new sql.Request().query("select  idOrden,fechaOrden,costoOrden,descuentoOrden,totalOrden,nombreCliente,locacionOrden from ordenes o inner join clientes c on o.idCliente = c.idCliente").then(function (recordset) {
      callback(null,recordset);
      console.log('query ejecutandose : get ordenes'); 
     }).catch(function (err) {
      callback(err,null);
      console.error(err);   
      });
    }).catch(function (err) {
    callback(err,null);
    console.error(err);
    });
  }


module.exports=ordenModelo;