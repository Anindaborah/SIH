const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/AgroBuy")

// const DistrictSchema = new mongoose.Schema({
//     district:{
//         type:String,
//         required:true
//     }
// })



const UserSchema = new mongoose.Schema({
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

    // district:DistrictSchema,

    password:{
        type:String,
        required:true
    
    },
    confirmPassword:{
        type: String,
        required: true
       
    }
    
})

const User = mongoose.model('User',UserSchema)

module.exports={
    User
}