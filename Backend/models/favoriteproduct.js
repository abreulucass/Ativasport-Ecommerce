const mongoose = require('mongoose')

const schemaProduct = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
})


module.exports = mongoose.model('Favoriteproduct', schemaProduct);