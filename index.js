const express =require('express')
const mongoose =require('mongoose')
const app =express()
const routs =require('./routes')

app.use('/',routs)
app.listen(3000,async()=>{
    await mongoose.connect('mongodb://localhost/newtestx')
    console.log('port up')
    console.log('db connected')
})