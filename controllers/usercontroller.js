const { default: mongoose } = require('mongoose');
const User = require('../models/userschema');


const userget = (req,res,next) => {
    User.find()
    .then(result => {
        res.status(200).json({
            userData : result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const usergetbyId = (req,res,next) => {
    console.log(req.body.id);
    User.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            userData : result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}


const userpost = (req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        email:req.body.email,
        phone:req.body.phone
    })
    user.save()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            newUser: result
        })
     })

     .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
}

const userdelete = (req,res,next)=>{
    User.remove({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            message:'message deleted',
            result:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}

const userput = (req,res,next) =>{
  console.log(req.params.id);
  User.findOneAndUpdate({_id:req.params.id},{
    $set:{
    firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        email:req.body.email,
        phone:req.body.phone
    }
  })
  .then(result=>{
    res.status(200).json({
        updated:result
    })
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
}

module.exports = {
    userget,
    usergetbyId,
    userpost,
    userdelete,
    userput
};