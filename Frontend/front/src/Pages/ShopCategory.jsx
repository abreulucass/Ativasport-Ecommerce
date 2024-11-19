import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/Frontend_Assets/dropdown_icon.png'
import { Item } from  '../Components/Item/Item'

export default function ShopCategory(props) {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Mostrando 1-12</span> de 36 produtos
        </p>
        <div className='shopcategory-sort'> Filtrar <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          console.log(item.category)
          if(props.category === item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} old_price = {item.old_price} />
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explorar mais
      </div>
    </div>
  )
}
