const Order = require('../models/order');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/getorders',  async (req, res) => {

    const orderList = await Order.find({}).populate('user', { name: 1, _id: 0 }).sort({'dateOrder': -1})

    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)

})

router.post('/createorder', async(req, res) => {

    const token = req.header('auth-token');
    
    let orders = await Order.find({});
    let id;

    const decodedToken = jwt.decode(token, { complete: true });

    const user = decodedToken.payload.user.id;
    

    if(orders.length > 0){

        let last_orders_array = orders.slice(-1);
        let last_orders = last_orders_array[0];
        id = last_orders.id+1;

    } else {

        id = 1;
    }


    let order = new Order({
        id: id,
        user: user,
        products: req.body.products,
        totalPrice: req.body.totalPrice
    });

    order = await order.save();
    
    console.log(order);
    console.log("Saved");

    res.json({
        success: true, 
        idOrder: id,
    })
})

router.delete('/removeorder/:id', async (req, res) => {
    //const product = Product.findOne({id:req.params.id})
    
    await Order.findOneAndDelete({id:req.params.id});
    console.log("Removed");
    res.json({
        success: true,
        id: req.body.name
    })
})

module.exports = router;