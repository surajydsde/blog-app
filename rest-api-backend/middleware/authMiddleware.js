const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async(req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]
    if(!token) return res.status(401).json({ message: "No token"})

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        next();
    }catch(err){
        return res.status(401).json({ message: " Invalid Token "})
    }
}

module.exports = { protect }