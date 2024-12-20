import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import fav_icon_off from '../Assets/Frontend_Assets/favorito_off.png'
import fav_icon_on from '../Assets/Frontend_Assets/favorito_on.png'

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext)
    const [isFavorito, setIsFavorito] = useState();

    const isFavorite = async (product) => {
        if(localStorage.getItem('auth-token')){
            console.log(product.id)
            const res = await fetch(`http://localhost:8000/product/favorite/${product.id}`, {
                method: 'GET',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            
            console.log(res)

            if(res.success === true){
                setIsFavorito(true);
            } else {
                setIsFavorito(false);
            }
        } else {
            setIsFavorito(false)
        }
        
    }


    useEffect(() => {
        isFavorite(product)
    }, [product])
        
    const toggleFavorito = async (id) => {
        if(!localStorage.getItem('auth-token')){
            alert("Não foi possivel favoritar o produto pois você não esta logado")
            return false
        }

        if(isFavorito === false){
            const res = await fetch(`http://localhost:8000/product/favorite/${id}`, {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ }),
            })
            .then((res) => res.json())

            if(res.success === true)
            {
                setIsFavorito(!isFavorito);
            } else {
                alert("Nao foi possivel favoritar o produto")
            }
        } else {
            const res = await fetch(`http://localhost:8000/product/favorite/${id}`, {
                method: 'DELETE',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ }),
            })
            .then((res) => res.json())

            if(res.success === true)
            {
                setIsFavorito(!isFavorito);
            } else {
                alert("Nao foi possivel desfavoritar o produto")
            }
        }
    };

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <img  src={isFavorito ? fav_icon_on : fav_icon_off}
                alt="Ícone de favorito"
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={() => {toggleFavorito(product.id)}}/>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt='' />
                <img src={star_icon} alt='' />
                <img src={star_icon} alt='' />
                <img src={star_icon} alt='' />
                <img src={star_dull_icon} alt='' />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price">
                    R${product.price}
                </div>
            </div>
            <div className="productdisplay-right-description">
                
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            {localStorage.getItem('auth-token')
            ?<button onClick={() => {addToCart(product.id)}}>ADICIONAR AO CARRINHO</button>:<Link to='/login'><button >ADICIONAR AO CARRINHO</button></Link>}
            {/* <p className='productdisplay-right-category'><span>Category: </span>Women, T-shirt, crop Top</p>
            <p className='productdisplay-right-category'><span>Tags: </span>Modern, Latest</p> */}
        </div>
    </div>
  )
}

