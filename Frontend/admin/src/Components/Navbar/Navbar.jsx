import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/logo_admin_painel.svg' 
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo' />
        <img src={navProfile} alt="" className='nav-profile'/>
    </div>
  )
}
