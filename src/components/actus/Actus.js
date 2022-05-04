import { ref, getDatabase, query, orderByChild, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Actus.scss';
import TextTruncate from 'react-text-truncate';
import Modal from '../modal/Modal';

const Actus = ({offset, isdesktop}) => {

    const [actus, setActus] = useState([])
    const [modalActus, setModalActus] = useState({
        open: false,
        img: '',
        title: '',
        date: '',
        desc: ''
    });

    const { open, img, title, date, desc } = modalActus;

    const openModal = (img, title, date, desc) => {
        setModalActus({
            ...modalActus,
            open: !open,
            img: img,
            title: title,
            date: date,
            desc: desc
        })
        //console.log('click open', e.target)
        document.body.style.overflow = 'hidden';
    }

    const closeModal = e => {
        e.stopPropagation();
        if (e.target.classList.contains('modal-container') || e.target.classList.contains('b-close-btn') || e.target.classList.contains('fa-xmark')) {
            setModalActus({
                ...modalActus,
                open: !open
            })
        } else {
            return false
        }
        // setModalActus({
        //     ...modalActus,
        //     open: !open
        // })
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        const db = getDatabase();
        
        const goGet = () => {
            const actusRef = query(ref(db, 'actus'), orderByChild('title'));
            onValue(actusRef, (snapshot) => {
                const data = snapshot.val();
                //console.log('SNAP : ', data) 

                const orderData = []
                Object.keys(data)
                    .sort()
                    .reverse()
                    .forEach(item => {
                        orderData.push({
                            'id': item,
                            'title': data[item].title,
                            'imgUrl': data[item].imgUrl,
                            'description': data[item].description,
                            'date': data[item].date,
                            'ext': data[item].ext,
                            'filename': data[item].filename
                        })
                    })
                setActus(orderData)
            });
        }
        goGet();
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <>
            <div id='actus' className="container-fluid b-dg-container b-actus">
                <div className="container">
                    <h2>Les dernières actualités</h2>
                    <div className="row actus-elem">
                        {
                            actus.map((elem, index) => (
                                <div className='col-12 col-md-6 col-lg-4 elem-col' key={elem.id} style={isdesktop ? ((index % 2 === 0) ? { transform: `translateY(-${(offset - 1100) * 0.12}px)` } : { transform: `translateY(${(offset - 1100) * 0.12}px)`}) : ({transform: 'none'})}>
                                    <div className='actu-wrapper'>
                                        <div className="top">
                                            <div className="img-wrapper">
                                                <img src={elem.imgUrl} alt={elem.title} />
                                            </div>
                                        </div>
                                        <div className="middle">
                                            <h4>{elem.title}</h4>
                                            <div className="date"><i className="fa-solid fa-calendar"></i>  {elem.date}</div>
                                            <TextTruncate
                                                className="desc"
                                                line={4}
                                                element="div"
                                                truncateText="..."
                                                text={elem.description}
                                                textTruncateChild={
                                                    (elem.ext && elem.ext !== '') ? <a className='savoir-plus' href={elem.ext} target="_blank" rel="noopener noreferrer">Vers l'article</a> : <span className='savoir-plus' onClick={() => openModal(elem.imgUrl, elem.title, elem.date, elem.description)}>Lire plus</span>
                                                }
                                            />
                                        </div>
                                        <div className="bottom"></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        open && <Modal fnclose={closeModal} img={img} title={title} date={date} desc={desc} />  
                    }
                </div>
            </div>
        </>
    )
}

export default Actus