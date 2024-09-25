const { express } = require("express")
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "123456"
const { json } = require("body-parser")


const app = express()   


app.post('/signin',(req,res) => {
    const username = req.body.username
     const password = req.body.password
     const phoneNo = req.body.phoneNo
     const email = req.body.email
     const confirmPassword = req.body.confirmPassword

     if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }


    User.findOne({
        username : username,
        password : password,
        phoneNo : phoneNo,
        email : email

    })
    .then(function(value){
        if(value==null){
            return res.status(411).json({
                message: "username does not exist"
            })
        }
    })
    

    User.create({
        username : username,
        password : password
    
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