// import React from 'react'
import './Admin.css'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { AddProduct } from '../../Components/AddProduct/AddProduct'
import { ListProduct } from '../../Components/ListProduct/ListProduct'
import { EditProduct } from '../../Components/EditProduct/EditProduct'
import { ListOrders } from '../../Components/Orders/orders'

const Admin = () => {
  
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            <Route path='/editproduct/:id' element={<EditProduct/>}/>
            <Route path='/listorders' element={<ListOrders/>}/>
        </Routes>
    </div>
  )
}

export default Admin