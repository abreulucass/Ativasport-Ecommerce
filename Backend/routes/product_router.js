
const Product = require('../models/product');
const User = require('../models/user');
const Favoriteproduct = require('../models/favoriteproduct');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get(`/favorite/:id`, async(req, res) => {
    const token = req.header('auth-token');
    const decodedToken = jwt.decode(token, { complete: true });

    const id = decodedToken.payload.user.id;

    const user = await User.findOne({_id:id});
    const product = await Product.findOne({id: req.params.id})

    let favProducts = await Favoriteproduct.findOne({user: user._id})

    if(!favProducts){
        return res.status(200).json({success: false})
    } else {
        const resp = await Favoriteproduct.findOne({ 
            _id: favProducts._id ,
            products: { $in: [product._id] },
        })
    
        if(!resp){
            return res.status(200).json({success: false})
        } else {
            return res.status(200).json({success: true})
        }
    }

})

router.post(`/favorite/:id`, async(req, res) => {
    console.log("entrei")
    const token = req.header('auth-token');
    const decodedToken = jwt.decode(token, { complete: true });

    const id = decodedToken.payload.user.id;

    const user = await User.findOne({_id:id});
    const product = await Product.findOne({id: req.params.id})

    let favProducts = await Favoriteproduct.findOne({user: user._id})

    if(favProducts){
        const newFav = await Favoriteproduct.findOneAndUpdate(
            { _id: favProducts._id },
            { $addToSet: { products: product._id } },
            { returnDocument: "after" }
        )
        const newUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { favoriteproducts: product._id } },
            { returnDocument: "after" }
        )
        const newProduct = await Product.findOneAndUpdate(
            { _id: product._id },
            { $addToSet: { userFavorites: user._id } },
            { returnDocument: "after" }
        )

        if(newFav && newProduct && newUser){
            res.status(200).json({success: true})
        } else {
            res.status(500).json({success: false})
        }

    } else {
        favProducts = new Favoriteproduct({
            user: [user._id],
            products: [product._id],
        })

        favProducts = await favProducts.save()

        console.log(favProducts)

        const newUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { favoriteproducts: product._id } },
            { returnDocument: "after" }
        )
        const newProduct = await Product.findOneAndUpdate(
            { _id: product._id },
            { $addToSet: { userFavorites: user._id } },
            { returnDocument: "after" }
        )

        if(favProducts && newProduct && newUser){
            res.status(200).json({success: true})
        } else {
            res.status(200).json({success: false})
        }
    }
})

router.delete(`/favorite/:id`, async(req, res) => {
    console.log("entrei")
    const token = req.header('auth-token');
    const decodedToken = jwt.decode(token, { complete: true });

    const id = decodedToken.payload.user.id;

    const user = await User.findOne({_id:id});
    const product = await Product.findOne({id: req.params.id})

    let favProducts = await Favoriteproduct.findOne({user: user._id})

    if(favProducts){
        const newFav = await Favoriteproduct.findOneAndUpdate(
            { _id: favProducts._id },
            { $pull: { products: product._id } },
            { returnDocument: "after" }
        )
        const newUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { favoriteproducts: product._id } },
            { returnDocument: "after" }
        )
        const newProduct = await Product.findOneAndUpdate(
            { _id: product._id },
            { $pull: { userFavorites: user._id } },
            { returnDocument: "after" }
        )

        if(newFav && newProduct && newUser){
            res.status(200).json({success: true})
        } else {
            res.status(500).json({success: false})
        }

    } 
})

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

router.post(`/addproduct`, async (req, res) => {

    let products = await Product.find({});
    let id;

    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
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


router.delete('/removeproduct/:id', async (req, res) => {
    //const product = Product.findOne({id:req.params.id})
    
    await Product.findOneAndDelete({id:req.params.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

module.exports = router;