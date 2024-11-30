const mongoose = require('mongoose');

const schemaProduct = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products:{
        type: Object,
    },
    totalPrice:{
        type: Number,
        required: true
    },
    dateOrder:{
        type: Date,
        default: Date.now,
    },

})


module.exports = mongoose.model('Order', schemaProduct);