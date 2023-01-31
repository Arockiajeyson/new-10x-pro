const mongoose =require('mongoose')

const models = new mongoose.Schema({
    name:{type:String},
    classId:{type:mongoose.Types.ObjectId,ref:'NewCloo'},
})
const data =mongoose.model('StudCloo',models)
module.exports=data