import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../Assets/Frontend_Assets/arrow.png'
import hero_image from '../Assets/Frontend_Assets/Hero_novo.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>VOCÊ QUE CHEGOU AGORA</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>novas</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>coleções</p>
                <p>esportivas</p>
            </div>
            <div className="hero-latest-bnt">
                <div>Ultimas Atualizações</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}
