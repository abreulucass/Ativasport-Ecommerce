import React, {useContext, useRef, useState} from "react";
import './Navbar.css'

import logo from '../Assets/Frontend_Assets/Logo_pequena_Ativa.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Nao sei" />
                <p>ATIVASPORT</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu === "shop"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("Masculino")}}><Link style={{textDecoration: 'none'}} to='/masculino'>Masculino</Link>{menu === "Masculino"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("Feminino")}}><Link style={{textDecoration: 'none'}} to='/feminino'>Feminino</Link>{menu === "Feminino"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("Infantil")}}><Link style={{textDecoration: 'none'}} to='/infantil'>Infantil</Link>{menu === "Infantil"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}

                {localStorage.getItem('auth-token')
                ?<Link to='/cart'><img src={cart_icon} alt="" /></Link>:<Link to='/login'><img src={cart_icon} alt="" /></Link>}
                <div className="nav-count-cart">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar