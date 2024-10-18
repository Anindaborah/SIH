const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser')
const{hashedPassword}=require( '/Signup.js')
const{ User }=require('./userSchema')
const JWT_SECRET='your_secret_key'

const app=express()

app.use(express.json())

app.post('/login', async(req,res)=>{
    const {username, password}=req.body



const user=User.findOne(username, password)
if(!user){
    return res.status(400).json({
        message:'Please enter correct username and password'
    })
}

async function isPasswordCorrect(password) {
    if (password!=password) {
        return res.status(401).json({
            message:'Please enter correct password'
        })
    } 
}

// async function isPasswordCorrect(password) {
//     const isPasswordCorrect= await bcrypt.comparePassword( password, password())
// }if(!isPasswordCorrect){
//    return res.status(401).json({
//     message:'please enter correct password'
//    })
// }

const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1h'})
res.json({token})
})

app.get('/authorization', (req,res)=>{
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