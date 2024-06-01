const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const UserModel = require('./Models/Employee')



mongoose.connect('mongodb://localhost:27017/employees')


app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})



app.post('/login',(req,res)=>{
    const {email,password} = req.body
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("Not Success")

            }
        }else{
            res.json("No Record Found")

        }
    })
    
})

app.listen(3001,()=>{
    console.log("server is running")
})