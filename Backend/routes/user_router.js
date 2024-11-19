const Usuario = require('../models/user')
const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const usuario = require('../models/user');

require('dotenv/config');

// router.get('/', async (req, res) => {
//     const usuarioList = await Usuario.find().select('-passwordHash');

//     if(!usuarioList){
//         res.status(500).json({success: false})
//     }
//     res.send(usuarioList);
// });

// router.get('/:id', async(req, res) => {
//     const usuario = await Usuario.findById(req.params.id).select('-passwordHash');

//     if(!usuario){
//         res.status(500).json({menssage: "O Id que foi passado não corresponde a um usuario"})
//     }
//     res.status(200).send(usuario);
// });

// router.post('/', async(req, res) => {
//     let usuario = new Usuario({
//         name: req.body.name,
//         email: req.body.email,
//         passwordHash: bcrypt.hashSync(req.body.password, 10),
//         phone: req.body.phone,
//         isAdmin: req.body.isAdmin,
//         street: req.body.street,
//         apartment: req.body.apartment,
//         zip: req.body.zip,
//         city: req.body.city,
//         country: req.body.country,
//     })

//     usuario = await usuario.save();

//     if(!usuario)
//         return res.status(401).send('O usuario nao foi possivel ser cadastrado');

//     res.send(usuario);
    
// })

// router.put('/:id',async (req, res)=> {

//     const usuarioExiste = await Usuario.findById(req.params.id);
//     let newPassword
//     if(req.body.password) {
//         newPassword = bcrypt.hashSync(req.body.password, 10)
//     } else {
//         newPassword = usuarioExiste.passwordHash;
//     }

//     const usuario = await Usuario.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             email: req.body.email,
//             passwordHash: newPassword,
//             phone: req.body.phone,
//             isAdmin: req.body.isAdmin,
//             street: req.body.street,
//             apartment: req.body.apartment,
//             zip: req.body.zip,
//             city: req.body.city,
//             country: req.body.country,
//         },
//         { new: true}
//     )

//     if(!usuario)
//     return res.status(400).send('the user cannot be created!')

//     res.send(usuario);
// })

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
        cartData: cart,
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

// router.delete('/:id', (req, res)=>{
//     Usuario.findByIdAndDelete(req.params.id).then(usuario =>{
//         if(usuario) {
//             return res.status(200).json({success: true, message: 'O usuario foi deletado!'})
//         } else {
//             return res.status(404).json({success: false , message: "Usuario nao encontrado!"})
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err}) 
//     })
// })

// router.get(`/get/count`, async (req, res) =>{
//     const usuarioCount = await Usuario.countDocuments()

//     if(!usuarioCount) {
//         res.status(500).json({success: false})
//     } 
//     res.send({
//         usuarioCount: usuarioCount
//     });
// })


module.exports = router;