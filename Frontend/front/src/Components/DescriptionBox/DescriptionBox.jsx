import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Descrição</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriprionbox-description">
            <p>
                bla bla bla bla
            </p>
            <p>
                mais bla bla bla bla
            </p>
        </div>
    </div>
  )
}
