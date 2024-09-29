const express=require('express')
const mongoose=require('mongoose')
const jsonwebtoken=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser')

const{hashedPassword}=require( '/Signup.js')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const user=User.findOne()
if(!user){
    return res.status(400).json({
        message:'Please enter correct username and password'
    })
}

async function isPasswordCorrect(password) {
    const isPasswordCorrect= await bcrypt.comparePassword( password, hashedPassword())
}if(!isPasswordCorrect){
   return res.status(400).json({
    message:'please enter correct password'
   })
}
