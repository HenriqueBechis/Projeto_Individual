var express = require("express");
var router = express.Router();
var analyticsController = require("../controllers/analyticsController");

router.get("/mostrarInstrumentos", function (req,res){
    analyticsController.mostrarInstrumentos(req,res);
});

module.exports = router;