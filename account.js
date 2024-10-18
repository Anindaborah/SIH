const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const JWT_SECRET="123456"
const user=require('./loginSchema')
const bodyParser=require('body-parser')

const app=express()

function authenticateAccount(req,res,next) {
    const token=req.headers['authorization']
    if(!token){
        res.status(404).json({
            message:'Token not found'
        })
    }
    try {
        const decoded=jwt.verify(token,JWT_SECRET)
         req.userId=decoded.userId
            next()
        
    } catch (error) {
        res.status(404).json({
            message:'Token not found'
        })
    }
}

app.get('/account-details',authenticateAccount,async (req,res)=>{
    try {
        const User= await user.findById(req.userId)
        if(!User){
            return res.status(404).json({
                message:'User not found'
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            message:'Unable to load account details'
        })
    }
})

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
    
})