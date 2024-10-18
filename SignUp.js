// import {createModule} from "module"
// const require=createModule(import.meta.url)

const express=require('express')
const { User } = require('./userSchema')
// const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "123456"
const { json } = require("body-parser")
const mongoose = require('mongoose')


const app = express() 

app.use(express.json()) 

app.post('/signup',async (req,res) => {
    const name = req.body.name
    const phoneNo = req.body.phoneNo
    const email = req.body.email
    const aadharNo = req.body.aadharNo
    const address = req.body.address
    const pin = req.body.pin
    const state = req.body.state
    // const district = req.body.district
     const password = req.body.password
     const confirmPassword = req.body.confirmPassword
    const role = req.body.role
     if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }


    const existingUser = await User.findOne({
        phoneNo : phoneNo,
        aadharNo : aadharNo
    })
    
    if(existingUser){
        res.status(411).json({
            msg : "user already exists"
        })
    }

   

    // // async function hashedPassword(password) {
    // //     const salt = 10; 
    // //     try {
    // //       const hashedPassword = await bcrypt.hash(password, salt);
    // //       return hashedPassword;
    // //     } catch (err) {
    // //       console.error(err);
    // //     }
    // //   }
    // // function hashedPassword(){
    // //     hashedPassword=12345;
    // //     return hashedPassword;
    // // }


    

    const newUser = await User.create({
        name : name,
        password : password,
        phoneNo : phoneNo,
        email : email,
        aadharNo:aadharNo,
        role : role,
        address:address,
        pin:pin,
        state:state,
        confirmPassword : confirmPassword
        // district:district
    }) 
    // if(newUser){
    //     res.status(200).json({
    //         msg : "user created successfully"
    //     })
    // }else{
    //     res.status(411).json({
    //         msg : "user could not be created"
    //     })
    // }


    const userId = req.body._id;

    var token = jwt.sign({userId : req.body._id},JWT_SECRET)
    res.status(200).json({
        msg : "user created successfully",
        token : token
    })

    // res.json({
    //     name : name
    // })
})

// export {hashedPassword}

app.listen(5000,()=>{
    console.log('Server is listening on port 5000');
    
})