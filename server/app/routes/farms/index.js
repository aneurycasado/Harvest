var router = require('express').Router();
var mongoose = require('mongoose');
var Farm = mongoose.model('Farm');
module.exports = router;

router.get("/", function(req,res,next){
  Farm.find({}).populate("user products")
  .then(function(farms){
    console.log("Farms ", farms);
    res.json(farms);
  })
  .then(null,next);
});

router.get("/:id", function(req,res,next){
  Farm.findOne({_id:req.params.id}).populate("user products")
  .then(function(farm){
    console.log("Farm ", farm);
    res.json(farm);
  })
  .then(null,next);
});
