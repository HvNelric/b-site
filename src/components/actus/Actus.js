import { ref, getDatabase, query, orderByChild, orderByValue, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Actus.scss';
import TextTruncate from 'react-text-truncate';
import Modal from '../modal/Modal';

const Actus = () => {

    //const dbRef = ref(getDatabase());
    const db = getDatabase();

    //const refModal = useRef();

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

        const actusRef = query(ref(db, 'actus'), orderByValue('date'));
        onValue(actusRef, (snapshot) => {
            const data = snapshot.val();
            console.log('SNAP : ', data)
            setActus(data)    
        });

        // get(
        //     dbRef, 'actus'
        // ).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log('SNAP : ', snapshot.val().actus)

        //         //////////////////////////////////////////////

                
        //         //////////////////////////////////////////////

        //         setActus(snapshot.val().actus)
        //     } else {
        //         console.log("No actus available");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });
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

    console.log('ACTUS : ', actus)

    return (
        <>
            <div id='actus' className="container-fluid b-dg-container b-actus">
                <div className="container">
                    <h2>Les dernières actualités</h2>
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
                                                    (actus[key].ext && actus[key].ext !== '') ? <span className='savoir-plus' href={actus[key].ext}target="_blank">Vers l'article</span> : <span className='savoir-plus' onClick={() => openModal(actus[key].imgUrl, actus[key].title, actus[key].date, actus[key].description)}>Lire plus</span>
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