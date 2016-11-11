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
module.exports = router;
