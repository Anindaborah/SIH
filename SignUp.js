const { express } = require("express")
const { User } = require('../db')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "123456"
const { json } = require("body-parser")
const mongoose = require('mongoose')

const Schema=mongoose.Schema

const app = express()   

const districtSchema=new Schema({
    district:{
        type:String,
        required:true
    }
})

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique:true,
    },
    role:{
        type:String,
        enum:['buyer','farmer','storage provider'],
        required:true
    },
    phoneNo:{
        type: Number,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: false,
        unique:true,
    },
    aadharNo:{
        type:Number,
        required:true,
        unique:true

    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },

    district:districtSchema,

    password:{
        type:String,
        required:true
    
    },
    confirmPassword:{
        type: String,
        required: true
       
    }
    
})

app.post('/signup',(req,res) => {
    const name = req.body.name
    const phoneNo = req.body.phoneNo
    const email = req.body.email
    const aadharNo = req.body.aadharNo
    const address = req.body.address
    const pin = req.body.pin
    const state = req.body.state
    const district = req.body.district
     const password = req.body.password
     const confirmPassword = req.body.confirmPassword

     if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }


    User.findOne({
        
        phoneNo : phoneNo,
        email : email,
        aadharNo:aadharNo,
       

    })
    .then(function(value){
        if(value==null){
            return res.status(411).json({
                message: "User already exists with these credentials"
            })
        }
    })

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    

    User.create({
        name : name,
        password : hashedPassword,
        phoneNo : phoneNo,
        email : email,
        aadharNo:aadharNo,
        address:address,
        pin:pin,
        state:state,
        district:district

    
    }).then(function(value){
        if(value==null){
            message : "user could not be created"
        }else{
            message  : " user created successfully"
        }
    })


    const userId = req.body._id;

    var token = jwt.sign({userId : req.body._id},JWT_SECRET)
    res.status(200).json({
        token : token
    })
})