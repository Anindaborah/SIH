const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const JWT_SECRET="123456"
const user=require('./loginSchema')

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
        res.status(200).json({
            message:'Account details fetched successfully',account:
        })
    } catch (error) {
        res.status(404).json({
            message:'Token not found'
        })
    }
}

app.get('')

app.post('/account',(req,res)=>{
    try {
        res.status(200).json({
            message:'Account details loaded successfully',account:
        })
    } catch (error) {
        res.status(401).json({
            message:'There was some error in loading your account details'
        })
    }
})