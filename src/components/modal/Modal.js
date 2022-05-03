import React from 'react'

const Modal = ({fnclose, img, title, date, desc}) => {
    return (

        <div className="modal-container" onClick={fnclose}>
            <div className="b-modal">
                <div className="modal-wrapper">
                    <div className="img-wrapper">
                        <img src={img} alt={title} />
                        <h3 className='modal-title'>{title}</h3>
                    </div>
                    <button className='btn b-close-btn'><i className="fa-solid fa-xmark"></i></button>
                    <div className="middle">
                        <div className="modal-date">{date}</div>
                        <div className="modal-desc">{desc}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal