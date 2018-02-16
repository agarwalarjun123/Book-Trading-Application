const express=require('express');
const mongoose=require('mongoose');
const books=require('../model/booksmodel');
const bodyParser=require('body-parser');
const bookRouter=express.Router();
bookRouter.use(bodyParser.json());
bookRouter.route('/')
.post((req,res,next)=>{
books.create({"bookName":req.body.title,"bookAuthor":req.body.author,"bookDesc":req.body.description,"userId":req.body.UId,"bookicon":req.body.imgurl},(err,result)=>{
	
	res.statusCode=200;
	console.log(req.hostname);
	res.setHeader("Content-type","application/json");
	
	res.json(result);
	
	
});
});
module.exports=bookRouter;