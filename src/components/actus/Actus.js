import { ref, getDatabase, query, orderByChild, orderByValue, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Actus.scss';
import TextTruncate from 'react-text-truncate';
import Modal from '../modal/Modal';

const Actus = () => {

    //const dbRef = ref(getDatabase());
    const db = getDatabase();

    //const refModal = useRef();

    const [actus, setActus] = useState([])
    const [modalActus, setModalActus] = useState({
        open: false,
        img: '',
        title: '',
        date: '',
        desc: ''
    });

    const { open, img, title, date, desc } = modalActus;

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
        goGet()
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
                            actus.map(elem => (
                                <div className='col-12 col-md-6 col-lg-4 elem-col' key={elem.id}>
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
                                                    (elem.ext && elem.ext !== '') ? <a className='savoir-plus' href={elem.ext} target="_blank">Vers l'article</a> : <span className='savoir-plus' onClick={() => openModal(elem.imgUrl, elem.title, elem.date, elem.description)}>Lire plus</span>
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