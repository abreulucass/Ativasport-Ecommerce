import React from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'

export const NewCollections = () => {

  const[new_collection, setNew_collection] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/product/getnewcollection')
    .then((res) => res.json())
    .then((data) => {setNew_collection(data)})
  }, [])

  return (
    <div className='new-collections'>
        <h1>NOVA COLEÇÃO</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} old_price = {item.old_price}/>
            })}
        </div>
    </div>
  )
}
