import { get, ref, getDatabase, child } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import './Actus.scss';
import TextTruncate from 'react-text-truncate';

const Actus = () => {

    const dbRef = ref(getDatabase());
    const refModal = useRef();

    const [actus, setActus] = useState({})
    const [modalActus, setModalActus] = useState({
        open: false,
        img: '',
        title: '',
        date: '',
        desc: ''
    });

    const { open, img, title, date, desc } = modalActus;

    const goGet = () => {
        get(
            dbRef, '/actus'
        ).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('SNAP : ', snapshot.val().actus)
                setActus(snapshot.val().actus)
            } else {
                console.log("No actus available");
            }
        }).catch((error) => {
            console.error(error);
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
            //document.body.style.overflow = 'hidden';
    }

    const closeModal = e => {
        if (open && refModal.current && !refModal.current.contains(e.target)) {
            setModalActus({
                ...modalActus,
                open: !open
            })
        }
        setModalActus({
            ...modalActus,
            open: !open
        })
        //document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        goGet()
    }, [])

    return (
        <>
            <div id='actus' className="container-fluid b-dg-container b-actus">
                <div className="container">
                    <h2 className='text-center'>Actualités</h2>
                    <div className="row actus-elem">
                        {
                            Object.keys(actus).map(key => (
                                    <div className='col-12 col-md-4 elem-col' key={key}>
                                        <div className='actu-wrapper'>
                                            <div className="top">
                                                <div className="img-wrapper">
                                                    <img src={actus[key].imgUrl} alt={actus[key].title} />
                                                </div>
                                            </div>
                                            <div className="middle">
                                                <h4>{actus[key].title}</h4>
                                                <div className="date">{actus[key].date}</div>
                                                <TextTruncate
                                                    className="desc"
                                                    line={4}
                                                    element="div"
                                                    truncateText="…"
                                                    text={actus[key].description}
                                                    textTruncateChild={
                                                        (actus[key].ext && actus[key].ext !== '') ? <a className='savoir-plus' href={actus[key].ext}target="_blank">Vers l'article</a> : <span className='savoir-plus' onClick={() => openModal(actus[key].imgUrl, actus[key].title, actus[key].date, actus[key].description)}>Lire plus</span>
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
                        open && (<div className="modal-container" ref={refModal}>
                            <div className="b-modal">
                                <div className="modal-wrapper">
                                    <div className="img-wrapper">
                                        <img src={img} alt={title} />
                                        <h3 className='modal-title'>{title}</h3>
                                    </div>
                                    <button onClick={closeModal} className='btn b-close-btn'><i className="fa-solid fa-xmark"></i></button>
                                    <div className="middle">
                                        <div className="modal-date">{date}</div>
                                        <div className="modal-desc">{desc}</div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Actus