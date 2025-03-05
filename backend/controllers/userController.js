require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors=require("cors");
const jwt = require("jsonwebtoken");

const User=require("../models/User");
mongoose.connect( "mongodb://localhost:27017/SafeHaven")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));



const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

const createAccount=async(req,res)=>{

    try{
        console.log("Request Body:", req.body); 
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const isUser=await User.findOne({email});
    if(isUser){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({name,email,password:hashedPassword});

    await user.save();

    return res.status(201).json({message:"User created successfully"});
    }
    catch(err){
        console.error("Error in createAccount:", err);
        return res.status(500).json({message:"Internal server error"});
    }
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }

        
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(200).json({message:"Login successful", token});
    }
    catch(err){
        console.error("Error in login:", err);
        return res.status(500).json({message:"Internal server error"});
    }
};

module.exports = {createAccount,login};