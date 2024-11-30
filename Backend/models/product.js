const mongoose = require('mongoose')

const schemaProduct = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    avilable:{
        type: Boolean,
        default: true,
    },
    userFavorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

})


module.exports = mongoose.model('Product', schemaProduct);