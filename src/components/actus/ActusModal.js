import React from 'react'
import './Actus.scss'

const ActusModal = ({ title, close, img, desc, date }) => {
    
    return (
        <div className="modal-container">
            <div className="modal-wrapper">
                <div className="img-wrapper">
                    <img src={img} alt={title} />
                </div>
                <button onClick={close} className='btn b-close-btn'><i className="fa-solid fa-xmark"></i></button>
                <div className="middle">
                    <h4 className='modal-title'>{title}</h4>
                    <div className="modal-date">{date}</div>
                    <div className="modal-desc">{desc}</div>
                </div>
            </div>
        </div>
    )
}

export default ActusModal