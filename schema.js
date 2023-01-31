const mongoose =require('mongoose')

const models = new mongoose.Schema({
    class:{type:String},
    studentCount:{type:String}
})
const data =mongoose.model('NewCloo',models)
module.exports=data