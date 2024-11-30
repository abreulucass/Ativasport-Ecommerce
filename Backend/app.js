const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const path = require('path')

require('dotenv/config');
const port = 8000;

app.use(cors())
app.options('*', cors())

//middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'))

//Routes
const produtosRoutes = require('./routes/product_router')
const usuariosRoutes = require('./routes/user_router')
const carrinhoRoutes = require('./routes/cart_router')
const pedidosRouter = require('./routes/order_router')

app.use(`/product`, produtosRoutes)
app.use(`/user`, usuariosRoutes)
app.use(`/cart`, carrinhoRoutes)
app.use(`/order`, pedidosRouter)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Token inválido ou ausente' });
    } else {
        next(err);
    }
});

// Creating Upload Endpoint for images
app.use('/image', express.static('upload/images'))

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/image/${req.file.filename}`
    })
})

// Conectar com o banco de dados
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Conectado com sucesso com o Mongo')
})
.catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log("Server foi iniciado no servidor http://localhost:8000")
})