const User = require('../models/user')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({errors: "Por favor, realize o seu Login"})
    } else {
        try {
            const data = jwt.verify(token, process.env.SECRET);
            req.user = data.user;

            next();
        } catch (error) {
            res.status(401).send({errors: "Por favor, realize o seu Login"})
        }
    }
}

router.post('/addtocart', fetchUser, async(req, res) => {

    console.log("Added", req.body.itemId)
    
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;

    await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send({success: true, msg: "Added"})
})

router.delete('/removefromcart', fetchUser, async(req, res) => {

    console.log("removed", req.body.itemId)

    let userData = await User.findOne({_id:req.user.id});

    if(userData.cartData[req.body.itemId]> 0)
        userData.cartData[req.body.itemId] -= 1;

    await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send({success: true})
})

router.get('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

module.exports = router;