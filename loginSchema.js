const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    language:{
        type:String,
        enum:[english,hindi,assamese,marathi],
        default:english
    }
})

module.exports = mongoose.model('User', userSchema)