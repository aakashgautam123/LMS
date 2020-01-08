var mongoose = require('mongoose');

 //Leads schema
var leadsSchema = mongoose.Schema({
  name:{
    type:String,
    require:true
  }, 
  email:{
    type:String
  },
  company:{
    type:String
  },
  address:{
    type:String
  },
  region:{
    type:String
  },
  phone:{
    type:String
  },  
  product:{
    type:String
  },
  productRange:{
    type:String
  },
  message:{
    type:String    
  },
  status:{
    type:String    
  },
  date:{
    type:String    
  },
  source:{
    type:String    
  },
  comments:{
    type:String
  }
});
//export module with model name and schema name
var Leads = module.exports = mongoose.model('leads' , leadsSchema);
