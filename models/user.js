const express=require('express');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
},{timestamps:{createAt:"createdAt",updatedAt:"updatedAt"}})

module.exports =mongoose.model('User',userSchema);