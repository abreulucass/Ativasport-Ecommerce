import React, {useState} from 'react'
import './Popular.css'
import { Item } from '../Item/Item'
import { useEffect } from 'react';

export const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/product/getpopularinwomen')
    .then((res) => res.json())
    .then((data) => {setPopularProducts(data)})
  }, [])

  return (
    <div className='popular'>
        <h1>POPULAR ENTRE AS MULHERES</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}
