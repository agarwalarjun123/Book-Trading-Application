const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const schema=mongoose.Schema;
const userschema=new schema({
name:{
	type:String,
	required:true
},
username:{
type:String,
required:true
},
password:{
type:String,
required:true
},
points:{
	type:Number,
	required:true
}



});
const usermodel=mongoose.model('auth',userschema);
module.exports=usermodel;
