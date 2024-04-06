const User=require('../models/user');
const bcrypt=require('bcrypt');

const registerUser=async(req,res)=>{
 try{
     const  {name,email,password,mobile}=req.body;

     if(!name || !email || !password || !mobile){
     

        return res.status(400).json({
            errorMessage: 'bad request',
        });
     }
     const isExistingUser=await User.findOne({email: email})
     if(isExistingUser){
        return res.status(400).json({
            errorMessage: 'user already exists',
        });
     }
     const hashedPassword=await bcrypt.hash(password,10)
     const userData=new User({
        name,
        email,
        password:hashedPassword,
        mobile,
     })
     await userData.save();
     res.json({message:"user registered successfully"})
 }catch(error){
    console.log(error);
    res.json({
        errorMessage:"something went wrong"
    })
 }
}

const loginUser=async(req,res)=>{
    try{
       const  {email,password}=req.body;
       if(!email || !password){
        return res.status(400).json({
            errorMessage: 'bad request',
        });
       }
       const userDetails = await User.findOne({email:email})
       if(!userDetails){
        return res.status(400).json({
            errorMessage: 'user not found',
        });
       }
       const passwordMatch=await bcrypt.compare(password,userDetails.password)
       if(!passwordMatch){
        return res.status(400).json({
            errorMessage: 'wrong password',
        });
       }
       res.json({
        message:"user logged in successfully",
        // token:userDetails.generateAuthToken()
       })

    }catch(error){
    console.log(error);
    res.json({
        errorMessage:"something went wrong"
    })
 }

}

module.exports = {registerUser, loginUser};