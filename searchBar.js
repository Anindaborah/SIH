const express=require('express')
const jwt=require('jsonwebtoken')
const {User}=require('./loginSchema')

const app=express()

app.use(express.json())

// app.post('/search',(req,res)=>({
//     const searchName=req.body.search
// }))

app.get('/search-result',async (req,res)=>{
    const findModel=res.query
    try {
      const result=await User.find()
        if(result!==0){
         res.status(200).send(result)
        }
        else{res.status(404).json({
            message:'User not found'
        })}
      
    } catch (error) {
        res.status(401).json({
            message:'There is something wrong in the search'
        })
    }
})

app.listen(6000,()=>{
    console.log('Server is listening on port 6000');
})