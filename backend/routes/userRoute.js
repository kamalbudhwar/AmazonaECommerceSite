import express from 'express';
import User from '../models/userModel';
var router=express.Router();

router.post('/sigin',async(req,res)=>{
    const signinUser=await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(signinUser){
        res.send({
            _id:signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token:getToken(user)
        })
    }
    else{
        res.status(401).send({msg:'Invalid Email or Password'});
    }
})

router.get('/createadmin',async(req,res)=>{
    try{
        var new_user=new User({
            name:'Kamal',
            email:'kamal@gmail.com',
            password:'1234',
            isAdmin:true
        });
     await new_user.save();
     res.send(new_user);
    }catch(error){
        res.send({msg:error.message});
    }   
});
module.exports=router;
