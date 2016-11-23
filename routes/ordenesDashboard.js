var express = require('express');
var router = express.Router();
var ordenModel= require('../models/orden');

router.get('/',function (req,res) {
    
    ordenModel.getOrdenes(function (error,data) { 
        if(data !== 'undefined')
        {
            res.render('ordenes',{listaOrdenes:data});
        }else
        {
            res.status(404).json({"result":"error"});
        }
     });
    
  });
module.exports= router;