const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

exports.registerUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
    
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
    
        res.status(200).json({
            message: "Signup Successfully",
            success: true,
            token: generateToken(user._id),
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

exports.loginUser = async (req, res)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res.status(404).json({message: "email or password is wrong", status: false});
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({message: "email or password is wrong"})
        }

        return res.status(200).json({
            message: "Login Successfully", 
            success: true,
            user: {_id: user._id}, 
            token: generateToken(user._id)
        })

    } catch(error){
        return res.status(500).json({message: error.message, success: false});
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};