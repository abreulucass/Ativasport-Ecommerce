const Usuario = require('../models/user')
const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('dotenv/config');

router.post('/login', async (req, res) => {
    let user = await Usuario.findOne({email: req.body.email})

    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, process.env.SECRET);

            res.json({success: true, token})
        } else {
            res.json({success:false, error:"Senha incorreta"});
        }
    } else {
        res.json({success:false, errors: "Email Incorreto"})
    }
})

router.post('/signup', async(req, res) => {
    
    let check = await Usuario.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({success: false, errors: "Esse usuario já existe"})
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    

    const user = new Usuario({
        name : req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, process.env.SECRET);

    res.json({success: true, token})
})

module.exports = router;