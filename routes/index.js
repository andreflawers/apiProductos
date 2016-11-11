/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();
var usuarioModelo= require('../models/usuario');

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
        res.json(200,{"result":"success"});
      }else
      {
        res.json(404,{"result":"no exist"});
      }
     });
   });
module.exports = router;
