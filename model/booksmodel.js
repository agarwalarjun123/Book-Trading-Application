const mongoose=require('mongoose');
const schema=mongoose.Schema;
const bookSchema=new schema({

bookName:{
	type:String,
	required:true
},
bookAuthor:{
type:String,
	required:true

},
bookDesc:{
	type:String,
	required:true
},
userId:{
	type:String,
	required:true
},
bookicon:{
	type:String,
	required:true
},
status:{
	type:String,
	required:true
}

},{
	timeStamps:true
});
var  bookmodel=mongoose.model('book',bookSchema);
module.exports=bookmodel;
