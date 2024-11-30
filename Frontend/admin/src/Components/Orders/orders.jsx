import { useEffect, useState } from 'react'
import './orders.css'
// import cross_icon from '../../assets/Admin_Assets/cross_icon.png'
// import product from '../../../../../Backend/models/product';


export const ListOrders = () => {

  const [all_orders, setAllOrders] = useState([]);
  const [all_product, setAllProducts] = useState([]);
  let [order_products] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/product/getproducts')
    .then((res) => res.json())
    .then((data) => {setAllProducts(data)})

   
    fetch('http://localhost:8000/order/getorders')
    .then((res) => res.json())
    .then((data) => {setAllOrders(data)})
    
  }, [])

  const fetchInfo = async () => {
    fetch('http://localhost:8000/order/getorders')
    .then((res) => res.json())
    .then((data) => {setAllOrders(data)})
  }

  const remove_order = async(id) => {
     await fetch(`http://localhost:8000/order/removeorder/${id}`, {
      method: "DELETE",
    });
    fetchInfo()
 }

  return (
    <div className='Central'>
      <h1>Lista de Pedidos</h1>
      {all_orders.map((a) => {
        order_products = a.products
        return (
          <div key={a.id} className='list-order'>
            <h2>Pedido de {a.user.name}</h2>
            <div className="cartitems-format-main">
              <p>Produtos</p>
              <p>Titulo</p>
              <p>Preço</p>
              <p>Quantidade</p>
              <p>Total</p>
              <hr/>
            </div>
           <hr/>
            {all_product.map((e) => {
              if(order_products[e.id] > 0)
              {
                  return (
                      <div key={e.id}>
                          <div className='cartitems-format cartitems-format-main'>
                              <img src={e.image} alt='' className="cartitems-product-icon" />
                              <p>{e.name}</p>
                              <p>R${e.price}</p>
                              <button className='cartitems-quantity'>{order_products[e.id]}</button>
                              <p>R${(e.price * order_products[e.id]).toFixed(2)}</p>
                          </div>
                          <hr />
                      </div>
                  );
              }
              return null;
            })}
            <div className="cartitems-down">
              <div className="cartitems-total">
                  <h2>Total e Data do Pedido</h2>
                  <div>
                      <div className="cartitems-total-item">
                          <h3>Total</h3>
                          <h3>R${a.totalPrice}</h3>
                          <h3>Data do Pedido</h3>
                          <h3>{a.dateOrder}</h3>
                      </div>
                  </div>
                  <button onClick={() => {remove_order(a.id)}}>EXCLUIR PEDIDO</button>
              </div>
            </div>
          </div>
        )
      })}
    </div> )    
}
