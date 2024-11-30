const mongoose = require('mongoose');
const favoriteproducts = require('./favoriteproduct');

const schemaUser = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData:{
        type: Object
    },
    favoriteproducts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'favoriteproduct'
    }],
    date:{
        type: Date,
        default: Date.now
    }
})

// schemaUser.virtual('id').get(function () {
//     return this._id.toHexString();
// })

// schemaUser.set('toJSON', {
//     virtuals: true,
// })

module.exports = mongoose.model('User', schemaUser);