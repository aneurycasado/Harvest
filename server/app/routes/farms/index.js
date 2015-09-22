var router = require('express').Router();
var mongoose = require('mongoose');
var Farm = mongoose.model('Farm');
var User = mongoose.model('User');
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
    console.log("Farm ", farm);
    res.json(farm);
  })
  .then(null,next);
});

router.post('/',function(req, res, next){
  User.findById(req.session.passport.user).then(function(user){
    if (Object.keys(user.farmId).length !== 12){
      Farm.findById(user.farmId).then(function(farm){
        farm.name = req.body.name;
        farm.description = req.body.description;
        farm.save().then(function(farm){
          res.send(farm);
        })
      })
    }else{
      Farm.create(req.body).then(function(farm){
        res.send(farm);
        console.log('created farm');
      })
    }
  }).then(null,next)
});
