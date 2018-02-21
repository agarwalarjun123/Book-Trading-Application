const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const Auth=require('./model/usermodel');
const books=require('./model/booksmodel');
const cookieParser=require('cookie-parser');
const trade=require('./model/trademodel');
//const booksget=require('./routes/getbooks');
const url="mongodb://localhost:27017/conFusion";
mongoose.connect(url,(err,result)=>{
if(err)
	console.log(err);
else
console.log("connected to mongodb server");
});
const app=express();
app.disable('etag');
app.set('views','./views');
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/login',function(req,res,next){


res.render('index');
});
app.get('/book/:bookid/:userid',(req,res,next)=>{
books.find({_id:req.params.bookid},(err,result)=>{
trade.create({owner:req.params.userid,reciever:result[0].userId,Book_id:req.params.bookid,Trade_date:Date()},function(err,result2){
	if(err)
		console.log(err);
books.update({_id:result[0]._id},{$set:{"status":"traded"}},function(err,result3){
Auth.update({_id:req.params.userid},{$inc:{"points":10}},(err,result4)=>{
Auth.find({_id:req.params.userid},(err,result5)=>{
res.redirect('/dashboard/'+result5[0].name);

})
});
});
});
});
});
app.post('/dashboard',function(req,res,next){
Auth.find({"username":req.body.username,"password":req.body.password},(err,result)=>{
if(result.length==1 ){
	res.redirect('/dashboard/'+result[0].name);
}
else
res.redirect('/login');
});
});
app.get('/dashboard/:name',(req,res,next)=>{
Auth.find({name:req.params.name},(err,result)=>{

books.find({$and:[{userId:{$ne:result[0]._id}},{"status":{$ne:"traded"}}]},(err,bookreq)=>{
res.render('Dashboard',{
	"name":result[0].name,
	"id":result[0]._id,
	"points":result[0].points,
	"bookrequest":bookreq
});

});
});

});
app.get('/ask/:name',(req,res,next)=>{
res.render('browse.ejs',{"name":req.params.name});



});



app.get('/',function(req,res,next){
res.redirect('/login');
});
const server=http.createServer(app);
server.listen(3000,'localhost',()=>{
console.log("connected to localhost: 3000");
});
