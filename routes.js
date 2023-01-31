const express= require('express')

const app = express()
const ClassSch =require('./schema')
const StuSch=require('./schema2')
app.use(express.json())
app.post('/v1/myClass',async(req,res)=>{
    try {
        const data=await ClassSch.create(req.body)
        return res.status(202).json({id:data._id})
    } catch (error) {
        return res.status(404).json(error.message)
    }
})
app.post('/v1/myClass/:myClassId/students',async(req,res)=>{
    try {
        const find = await ClassSch.findOne({_id:req.params.myClassId})
        const data =await StuSch.create({
            name:req.body.name,
            classId:find._id
        })
        return res.status(202).json({studentId:data._id})
    } catch (error) {
        res.status(404).json(error.message)
    }
})
app.get('/v1/myClass',async(req,res)=>{
    try {
        const find =await ClassSch.find()
        return res.status(202).json({classes:find})
    } catch (error) {
        return res.status(202).json(error.message)
    }
})

//v1/myClass/:myClassId
app.get('/v1/myClass/:myClassId',async(req,res)=>{
    try {
        const find =await ClassSch.find({_id:req.params.myClassId})
        if(find){
            return res.status(202).json(find)
        }
        return res.status(404).json('there is no id at these class')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
app.get('/v1/myClass/:myClassId/students',async(req,res)=>{
    try {
        const find =await StuSch.find({classId:req.params.myClassId})
        if(find){
            return res.status(202).json(find)
        }
        return res.status(404).json('There are no students at this class')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
app.get('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    try {
        const find =await StuSch.find({classId:req.params.myClassId,_id:req.params.studentId})
        if(find){
            return res.status(202).json(find)
        }
        return res.status(404).json('There is no student of that id')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
app.put('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    try {
        const find =await StuSch.find({classId:req.params.myClassId,_id:req.params.studentId})
        if(find){
            const dataUp= await StuSch.updateOne({classId:req.params.myClassId,_id:req.params.studentId},req.body)
            return res.status(202).json(dataUp)
        }
        return res.status(404).json('There is no student of that id')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
app.delete('/v1/myClass/:myClassId',async(req,res)=>{
    try {
        const find =await ClassSch.deleteOne({_id:req.params.myClassId})
        if(find){
            return res.status(202).json(find)
        }
        return res.status(404).json('There is no task at that id')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
app.delete('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    try {
        const find =await StuSch.find({classId:req.params.myClassId,_id:req.params.studentId})
        if(find){
            const dataUp= await StuSch.deleteOne({classId:req.params.myClassId,_id:req.params.studentId},req.body)
            return res.status(202).json(dataUp)
        }
        return res.status(404).json('There is no task at that id')
    } catch (error) {
        return res.status(202).json(error.message)
    }
})
module.exports=app