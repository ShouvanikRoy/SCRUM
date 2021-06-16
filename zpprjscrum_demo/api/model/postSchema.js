const mongoose =
require('mongoose'),
uniqueValidator = require('mongoose-unique-validator');
Schema = mongoose.Schema;
const Postchk = new Schema({

EMP_CODE:{
type:String,
required:true,
//unique:true
},

EMP_NAME:{
type:String,
required: true
},

JOB_ROLE:{
type:String,
required:true
},

PLANT:{
type: String,
required: true,
//unique:true
},

EMAIL:{
type: String,
required: true
},

MOBILE_NUMBER:{
type: Number,
required: true,
//unique:true
}
,

UID:{
type: String,
required:true
}


})

Postchk.plugin(uniqueValidator)
const postchk = mongoose.model('postchk',Postchk);
module.exports={postchk};