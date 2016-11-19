/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();
var usuarioModelo= require('../models/usuario');
var productosModelo = require('../models/productos');
var ordenModel= require('../models/orden');
var clientModelo= require('../models/cliente')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:'ususarios api'});
});

router.get('/usuarios',function (req,res) { 
  usuarioModelo.getUsuarios(function (error,data) {
    if(typeof data !== 'undefined')
    {
        res.json(200,data);
    }
    else
    {
        res.json(404,{"msg":"no exist"});
    }
  }
    );
 });

 router.get('/login',function (req,res) {
   var nombreUsuario = req.query.user;
   var contrasenaUsuario=req.query.contrasena;
   usuarioModelo.loginUsuario(nombreUsuario,contrasenaUsuario,function (error,data) {
      if(typeof data !== 'undefined' &&  data.length >= 1)
      {
        res.json(200,data[0]);
      }else
      {
        res.json(404,{"result":"no exist"});
      }
     });
   });
  

//Productos
router.get('/productos',function (req,res) {
  productosModelo.getProductos(function (error,data) {
      if(typeof data !== 'undefined')
      {
        res.status(200).json(data);
      }else
      {
        res.status(400).json(error);
     }
    });
  });

//Orden

router.post('/orden',function (req,res) { 
  var jsonData = req.body;
  console.log("yeison post",jsonData);
  ordenModel.postOrden(jsonData,function (error,datos) { 
      if(error== null)
      {
        console.log("aca plox")
        res.status(200).json({"result":"success"});
      }else
      {
        console.log(error);
        console.log("a ver aca");
        res.status(400).json({"result":"error"});
      }
   });
  
 });

//Cliente
router.get('/cliente',function (req,res) {

var idUsuario= req.query.idUsuario;
clientModelo.getDatosCliente(idUsuario,function (error,data) {
    if(typeof data!=='undefined' && data.length>=1)
    {
      res.status(200).json(data[0]);
    }else{
      res.status(404).json({"result":"error"});
    }

  });
  });


module.exports = router;
