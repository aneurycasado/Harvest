var router = require('express').Router();
var mongoose = require('mongoose');
var Farm = mongoose.model('Farm');
var User = mongoose.model('User');
var Product = mongoose.model("Product");
module.exports = router;

router.get("/", function(req,res,next){
  Farm.find({}).populate("user products")
  .then(function(farms){
    res.json(farms);
  })
  .then(null,next);
});

router.get("/:id", function(req,res,next){
  Farm.findOne({_id:req.params.id}).populate("user products")
  .then(function(farm){
    res.json(farm);
  })
  .then(null,next);
});

router.put("/:id", function(req,res,next){
  Farm.findOne({_id:req.params.id})
  .then(function(farm){
    for(var key in req.body){
      if(req.body[key]){
        farm[key] = req.body[key];
      }
    }
    farm.save().then(function(updatedFarm){
      res.json(updatedFarm);
    })
  })
  .then(null,next);
});

router.post("/:id", function(req,res,next){
  console.log("We hit the post");
  var data = {};
  Farm.findOne({_id:req.params.id}).populate("products")
  .then(function(farm){
    console.log("Farm found ", farm);
    data = farm;
    return Product.create(req.body)
  })
  .then(function(createdProduct){
    console.log("Product created ", createdProduct);
    var currentFarm = data;
    currentFarm.products.push(createdProduct);
    return currentFarm.save()
  })
  .then(function(updatedFarm){
    console.log("Farm saved ", updatedFarm);
    res.json(updatedFarm);
  })
  .then(null,next);
});


router.get("/me/farm/", function(req,res,next){
  Farm.findOne({user:req.user._id}).populate("user products")
  .then(function(farm){
    console.log("Farm for me ", farm);
    res.json(farm);
  })
  .then(null,next);
});


router.post('/',function(req, res, next){
  req.body.user = req.user._id;
  Farm.create(req.body).then(function(createdFarm){
    res.json(createdFarm);
  }).then(null,next)
});
