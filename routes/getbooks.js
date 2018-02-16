const express=require('express');
const mongoose=require('mongoose');
const books=require('../model/booksmodel');
const bodyParser=require('body-parser');
const bookRouter=express.Router();
bookRouter.use(bodyParser.json());
bookRouter.route('/')
.post((req,res,next)=>{
books.find({userId:req.body.id},(err,result)=>{
res.statusCode=200;
res.setHeader("Content-type","application/json");
res.json(result);
});
});
module.exports=bookRouter;