var express = require('express');
var router = express.Router();
var subOrdenModelo = require('../models/subOrden')

router.get('/',function (req,res) {
    var idOrden = req.query.idOrden;
    subOrdenModelo.getSubOrden(idOrden,function (error,data) {
        if(data !=='undefined')
        {
            res.render('subOrden',{lista:data});
        }else
        {
            res.status(404).json({"result":"error"})
        }
      })
  });

  module.exports=router;