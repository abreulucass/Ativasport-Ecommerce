import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Tem nada aqui não</h1>
        <p>Mas se tu quiser mandar um pix</p>
        <div>
            <input type="email" placeholder='Digite a quantidade que deseja mandar'/>
            <button>Mandar</button>
        </div>
    </div>
  )
}
