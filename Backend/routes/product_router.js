const User = require('../models/user')
const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const { error } = require('console');


/*router.get(`/`, async (req, res) => {
    const produtoList = await Produto.find().select('name image -_id');

    if(!produtoList){
        res.status(500).json({success: false})
    }
    res.send(produtoList)
})*/

router.get(`/getproducts`, async (req, res) => {

    const productList = await Product.find({});

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
})

router.get(`/getproduct/:id`, async (req, res) => {

    const product = await Product.find({id:req.params.id});

    console.log(product)

    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product)
})

router.get(`/getnewcollection`, async(req, res) => {
    let product = await Product.find({});
    let newcollection = product.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection)
})

router.get(`/getpopularinwomen`, async(req, res) => {
    let product = await Product.find({category: "Feminino"})
    let popular_in_womem = product.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_womem)
})

// router.get(`/:id`, async (req, res) => {
//     const produto = await Produto.findById(req.params.id).populate('category');

//      f(!produto){
//         res.status(500).json({success: false})
//     }
//     res.send(produto)
//  })

router.post(`/addproduct`, async (req, res) => {

    let products = await Product.find({});
    let id;

    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id+1;
    } else {
        id = 1;
    }

    let product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
    });

    product = await product.save();
    
    console.log(product);
    await product.save();
    console.log("Saved");

    res.json({
        success: true, 
        name: req.body.name,
    })
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token)
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

router.post('/removefromcart', fetchUser, async(req, res) => {

    console.log("removed", req.body.itemId)

    let userData = await User.findOne({_id:req.user.id});

    if(userData.cartData[req.body.itemId]> 0)
        userData.cartData[req.body.itemId] -= 1;

    await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send({success: true, msg: "Removed"})
})

router.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

router.put('/editproduct/:id', async (req, res) => {


    const product = await Product.findOneAndUpdate(
        {id:req.params.id},
        {
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price
        },
        { new: true}
    )

    res.json({
        success: true,
        product: product
    })
});

// router.put('/gallery-images/:id', 
//     //uploadOptions.array('images', 10), 
//     async (req, res) => {
//         if(!mongoose.isValidObjectId(req.params.id)){
//             res.status(400).send('Id do produto invalido')
//         }
        
//         const files = req.files
//         let imagesPaths = [];
//         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

//         if(files){
//             files.map(file => {
//                 imagesPaths.push(`${basePath}${file.filename}`);
//             })
//         }
        

//         const produto = await Produto.findByIdAndUpdate(
//             req.params.id,
//             {
//                images: imagesPaths
//             },
//             { new: true}
//         )

//         if(!produto){
//             res.status(500).json({menssage: "O Id que foi passado não corresponde a uma produto"})
//         }
//         res.status(200).send(produto);
// })

router.delete('/removeproduct/:id', async (req, res) => {
    //const product = Product.findOne({id:req.params.id})
    

    await Product.findOneAndDelete({id:req.params.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// router.get(`/get/count`, async (req, res) => {
//     const produtoCount = await Produto.countDocuments()

//     if(!produtoCount){
//         res.status(500).json({success: false})
//     }
//     res.send({
//         produtoCount: produtoCount
//     })
// })

// router.get(`/get/featured/:count`, async (req, res) => {
//     const count = req.params.count ? req.params.count : 0
//     const produtos = await Produto.find({isFeatured: true}).limit(+count)

//     if(!produtos){
//         res.status(500).json({success: false})
//     }
//     res.send(produtos)
// })

module.exports = router;