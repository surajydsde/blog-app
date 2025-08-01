const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const register =  async (req, res)=>{
    const {name, email, password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message: "User Already Exists"});

    const user = await User.create({name, email, password});
    res.status(201).json({_id: user._id, name, email, token: generateToken(user._id)});
}

const login = async(req, res)=>{
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if(!user || !(await user.matchPassword(password)))  return res.status(400).json({ message: "Invalid credentials" })
    
      res.json({_id: user.id, name: user.name, email: user.email, token: generateToken(user._id) })
}

module.exports = {
    register, login
}