const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' , data : newUser});
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};



const login = async(req,res)=>{
    try{
        const{email , password} = req.body;
        if(!email){
            return res.status(400).json({status:false,message:"email is required"})
        }
        if(!password){
            return res.status(400).json({status:false,message:"password is required"})
        }
      
        const existingEmail = await User.findOne({
            email:email
        })
        if(!existingEmail){
            return res.status(400).json({status:false,message:"invalid email or password"})
        }
        const pass = await bcrypt.compare(password,existingEmail.password)
        if(!pass){
            return res.status(400).json({status:false,message:"invalid email or password"})
        }
        const token = jwt.sign({userId:existingEmail._id},process.env.JWT_SECRET,{
            expiresIn : "9d"
        })
        return res.status(200).json({status:true,message:"user login successfully",
        token})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


module.exports = { signup , login };
