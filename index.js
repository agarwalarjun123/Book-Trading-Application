const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const Auth=require('./model/usermodel');
const books=require('./model/booksmodel');
const cookieParser=require('cookie-parser');
const session = require('express-session');
const trade=require('./model/trademodel');
const book1=require('./routes/book');

//const booksget=require('./routes/getbooks');
const url="mongodb://localhost:27017/booktrading";


mongoose.connect(url,(err,result)=>{
if(err)
	console.log(err);
else
console.log("connected to mongodb server");
});
const app=express();
app.set('views','./views');
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));


//using sessions
app.use(session({
	name:'session-id',
	secret:'0123345',
	saveUninitialized: false,
 resave: false
}));
app.use(express.static(__dirname+'/public',{"etag":false}));


app.get('/signup',function(req,res,next){
res.render('signup');

});

app.get('/login',function(req,res,next){
res.render('index');

});
app.post('/register',function(req,res,next){
	Auth.create({"username":req.body.username,"password":req.body.password,"name":req.body.name,"points":50},function(err,result){
		console.log(result);
		res.redirect('/login');

	});
});
app.post('/review',(req,res,next)=>{

});




app.post('/dashboard',function(req,res,next){
Auth.find({"username":req.body.username,"password":req.body.password},(err,result)=>{
if(result.length==1 ){
	req.session.user=req.body.username;
	res.redirect('/dashboard/');
}
else
res.redirect('/login');
});
});


app.get('/book/:bookid/:userid',(req,res,next)=>{
books.find({_id:req.params.bookid},(err,result)=>{
trade.create({owner:req.params.userid,reciever:result[0].userId,Book_id:req.params.bookid,Trade_date:Date()},function(err,result2){
	if(err || result2.length==0)
		console.log(err);
books.update({_id:result[0]._id},{$set:{"status":"traded"}},function(err,result3){
Auth.update({_id:req.params.userid},{$inc:{"points":10}},(err,result4)=>{
Auth.find({_id:req.params.userid},(err,result5)=>{
res.redirect('/dashboard/');

})
});
});
});
});
});
app.post('/details/:name',function(req,res,next){
Auth.find({name:req.params.name},(err,result)=>{

books.create({bookName:req.body.title,bookDesc:req.body.description,
bookAuthor:req.body.authors,
bookicon:req.body.img,userId:result[0]._id,status:'requested'},(err,result1)=>{
res.redirect('/dashboard/');
});
});

});
app.get('/dashboard',(req,res,next)=>{
Auth.find({username:req.session.user},(err,result)=>{
	console.log(result);
	// if(result.length==0)
	// {
	//  var err1=new Error("Not Authenticated");
	//  err1.status=401;
	// return next(err1);
	// }
books.find({$and:[{userId:{$ne:result[0]._id}},{status:{$ne:"traded"}}]},(err,bookreq)=>{
books.find({userId:result[0]._id},function(err,status){
console.log(status);
res.render('Dashboard',{
	"username":result[0].username,
	"name":result[0].name,
	"id":result[0]._id,
	"points":result[0].points,
	"bookrequest":bookreq,
	"status":status,


});

});
});
});

});
app.get('/ask/:username',(req,res,next)=>{
	if (req.session.user==req.params.username)
res.render('browse.ejs',{name:req.params.username});
else {
	res.redirect('/login');
}



});


app.get('/logout',function(req,res,next){
req.session.user=undefined;
res.redirect('/login');
});

app.get('/',function(req,res,next){
res.render('homepage');
});
app.use((err,req,res,next)=>{
	if(err.status==401)
	res.redirect('/login');
});
const server=http.createServer(app);
server.listen(3000,()=>{
console.log("connected to localhost: 3000");
});
