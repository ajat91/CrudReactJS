const express = require('express');
const app = express()
const connectDb=require('./db/mongoose')
const cors=require ('cors')
const port=process.env.PORT || 5000

connectDb()
app.use(express.json())
app.use(cors())
app.use('/api',require('./route/berat'))

app.get("/",(req,res)=>{
    res.status(200).send('Hello')
})

app.post("/user",(req,res)=>{
    const {email, password}=req.body

    console.log("REQUEST BODY", req.body)
    console.log('Email',email)
    console.log('Password',password)

    res.status(200).json({email,password})
})

// app.delete('/user',(req,res)=>{
//     console.log('patch')
//     res.status(200).send('patch route')
// })

// app.patch()



app.listen(port, ()=>{
    console.log(`It started port ${port}`)
})

