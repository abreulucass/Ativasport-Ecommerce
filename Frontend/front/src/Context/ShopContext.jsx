import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    	
    const [all_product, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:8000/product/getproducts')
        .then((res) => res.json())
        .then((data) => {setAllProducts(data)})

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/cart/getcart',{
                method: 'GET',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch(error => console.error('Erro ao analisar o JSON:', error.message));
        }
    }, [])

    console.log(cartItems);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/cart/addtocart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/cart/removefromcart', {
                method: 'DELETE',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(error => console.error('Erro ao analisar o JSON:', error.message));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const createOrder = () => {
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/order/createorder', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"products": cartItems, "totalPrice": getTotalCartAmount()
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success === true){
                    alert("Pedido Efetuado")
                    setCartItems(getDefaultCart())
                } else {
                    alert("Pedido não efetuado")
                } 
            })
            .catch(error => console.error('Erro ao analisar o JSON:', error.message));

           
        }
        
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, createOrder};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;