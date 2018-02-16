const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Auth=require('../model/usermodel');
const loginRouter=express.Router();
loginRouter.use(bodyParser.json());
loginRouter.route('/')
.post((req,res,next)=>{
Auth.find({"username":req.body.username,"password":req.body.password},(err,result)=>
{
if(err)
	console.log(err);
else
{

	res.status(200);
	res.setHeader('Content-type','application/json');
	res.json(result);  

	

}

});
});

module.exports=loginRouter;