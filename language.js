const express=require('express')
const json=require('jsonwebtoken')
const mongoose=require('mongoose')


const User=require('/loginSchems.js')

const app=express()

app.post('/select-language', async(req,res)=>{
    const {userId,language}=req.body

    try {
        const user= await User.findByIdandUpdate(userId, {language},{new:true})
        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        
        }
        return res.status(200).json({
            message:`Language is updated to ${language}`,language:user.language
        })
    } catch (error) {
        res.status(400).json({
            message:'There was an error in updating the language',error:error.message
        })
    }

})

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
    })