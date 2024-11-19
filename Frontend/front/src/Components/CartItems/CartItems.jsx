import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext)
  
    return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Produtos</p>
            <p>Titulo</p>
            <p>Preço</p>
            <p>Quantidade</p>
            <p>Total</p>
            <p>Remover</p>
        </div>
        <hr />
        {all_product.map((e) => {
            if(cartItems[e.id] > 0)
            {
                return (
                    <div key={e.id}>
                        <div className='cartitems-format cartitems-format-main'>
                            <img src={e.image} alt='' className="cartitems-product-icon" />
                            <p>{e.name}</p>
                            <p>R${e.price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>R${(e.price * cartItems[e.id]).toFixed(2)}</p>
                            <img 
                                src={remove_icon} 
                                onClick={() => removeFromCart(e.id)} 
                                alt="Remover item" 
                                className="cartitems-remove-icon" 
                            />
                        </div>
                        <hr />
                    </div>
                );
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Total do Carrinho</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>R${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Frete</p>
                        <p>grátis</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>R${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>POSSEGUIR PARA PAGAMENTO</button>
            </div>
            <div className="cartitems-promocode">
                <p>Se você tem um cupom de desconto, insira aqui</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="cupom"/>
                    <button>Confirmar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
