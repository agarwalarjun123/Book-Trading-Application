const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const booksget=require('./routes/getbooks');
const books=require('./routes/book');
const url="mongodb://localhost:27017/conFusion";
mongoose.connect(url,(err,result)=>{
if(err)
	console.log(err);
else
console.log("connected to mongodb server");

});
const app=express();

app.set('views','./views');
app.set('view engine','ejs');
const auth=require('./routes/auth');
app.use(morgan('dev'));
app.get('/login',function(req,res,next){
res.render('index');
});

app.get('/dashboard/:name',function(req,res,next){
	res.render('Dashboard',{"title":req.params.name});

});

app.use('/getbook',booksget);
app.use('/auth',auth);
app.use('/book',books);
app.use('/',function(req,res,next){
res.redirect('/login');
});
const server=http.createServer(app);
server.listen(3000,'localhost',()=>{
console.log("connected to localhost: 3000");
});