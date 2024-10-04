const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser')
const{hashedPassword}=require( '/Signup.js')
const user=require('./loginSchema.js')
const JWT_SECRET='your_secret_key'

const app=express()

app.post('/login', async(req,res)=>{
    const {username, password}=req.body



const user=User.findOne()
if(!user){
    return res.status(400).json({
        message:'Please enter correct username and password'
    })
}

async function isPasswordCorrect(password) {
    const isPasswordCorrect= await bcrypt.comparePassword( password, hashedPassword())
}if(!isPasswordCorrect){
   return res.status(401).json({
    message:'please enter correct password'
   })
}

const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1h'})
res.json({token})
})

app.get('/protected', (req,res)=>{
    const token=req.headers['authorization']

    if(!token){
        return res.status(401).json({
            message:'token do not match'
        })
    }

    try {
        const userFormat=jwt.verify(token, JWT_SECRET)
        res.json({
            message:'protected data', userId: userFormat.userId
        })
        
    } catch (error) {
        return res.status(400).json({
            message:'request failed'
        })
    }
})

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})