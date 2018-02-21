const mongoose=require('mongoose');
const schema=mongoose.Schema;
const tradeSchema=new schema({
	owner:{
	type:String,
	required:true
	},
	reciever:{
		type:String,
		required:true
	},
	Book_id:{
		type:String,
		required:true
	},
	Trade_date:{
		type:Date,
		required:true
	}
});

var tradeModel=mongoose.model("tradeinfo",tradeSchema);
module.exports=tradeModel;
