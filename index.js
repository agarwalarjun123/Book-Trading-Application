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
const auth=require('./routes/auth');
app.use(morgan('dev'));

app.use('/getbook',booksget);
app.use('/auth',auth);
app.use('/book',books);
app.use('/public',express.static('public'));
const server=http.createServer(app);
server.listen(3000,'localhost',()=>{
console.log("connected to localhost: 3000");
});