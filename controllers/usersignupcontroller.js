const mongoose  = require('mongoose');
const Userlo = require('../models/usersignupSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userlopost = (req,res,next) =>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const userlo = new Userlo({
                _id: new mongoose.Types.ObjectId,
                  firstname:req.body.firstname,
                 lastname:req.body.lastname,
                 gender:req.body.gender,
                 email:req.body.email,
                 phone:req.body.phone,
                 userType:req.body.userType,
                 password:hash
            })
            userlo.save()
            .then(result =>{
               // console.log(result)
                res.status(200).json({
                    newUserlo: result
                })
             })
        
             .catch(err => {
               // console.log(err);
                res.status(500).json({
                    error:err
                })
             })
        }
    })
}

const key = process.env.KEY;

const userloginpost = (req,res,next) =>{
    Userlo.find({email:req.body.email})
    .exec()
    .then(userlogin =>{
        if(userlogin < 1){
            return res.status(401).json({
                msg: "USER NOT FOUND"
            })
        }
        bcrypt.compare(req.body.password,userlogin[0].password,(err,result) =>{
            if(!result){
                return res.status(401).json({
                    msg: "password not matched"
                })
            }
            if(result){
               const token = jwt.sign({
                firstname:userlogin[0].firstname,
                lastname:userlogin[0].lastname,
                gender:userlogin[0].gender,
                email:userlogin[0].email,
                phone:userlogin[0].phone,
                userType:userlogin[0].userType,
             },
             key,
             {
                expiresIn:"24h"
             }
             );
             res.status(200).json({
                firstname:userlogin[0].firstname,
                lastname:userlogin[0].lastname,
                gender:userlogin[0].gender,
                email:userlogin[0].email,
                phone:userlogin[0].phone,
                userType:userlogin[0].userType,
                token: token
             })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}

module.exports = {userlopost,userloginpost};