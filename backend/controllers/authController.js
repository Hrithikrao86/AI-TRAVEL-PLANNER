const bcrypt=require("bcryptjs");

const User=require("../models/User");

const jwt=require("jsonwebtoken");

const registerUser =async (req,res)=>{

    try{
    const {email,password}=req.body;
    const existingUser = await User.findOne({
  email,
});
if(existingUser){
   return res.status(400).json({
  message: "User already exists",
});
}

const hashedPassword = await bcrypt.hash(password,10);
const user = new User({email,password: hashedPassword});
await user.save();
return res.status(201).json({
message:"User Registered Successfully"
});
}
catch(e){

        res.status(500).json({
            message:"Internal Server Error"
        });

}
}


const loginUser=async(req,res)=>{
    try{
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });}

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch){
  return res.status(400).json({
        message: "Invalid Password"
    });
    }

const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: "7d"});
return res.status(200).json({message:"Login Successful",token:token});


    }
    catch(e){
         console.log(e);
           res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports={loginUser,registerUser}