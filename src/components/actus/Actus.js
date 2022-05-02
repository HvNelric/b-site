import { get, ref, getDatabase, child } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Actus.scss';
import TextTruncate from 'react-text-truncate';

const Actus = () => {

    const dbRef = ref(getDatabase());
    const [actus, setActus] = useState({})
    const [modalActus, setModalActus] = useState(false)

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

    const openModal = e => {
        setModalActus(!modalActus)
        document.body.style.overflow = 'hidden';
    }

    const closeModal = e => {
        setModalActus(!modalActus)
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        goGet()
    }, [])

    return (
        <div id='actus' className="container-fluid b-dg-container b-actus">
            <div className="container">
                <h2 className='text-center'>Actualités</h2>
                <div className="row actus-elem">
                    {
                        Object.keys(actus).map(key => (
                            <>
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
                                            {/* <div className="desc">{actus[key].description}</div> */}
                                            <TextTruncate
                                                className="desc"
                                                line={4}
                                                element="div"
                                                truncateText="…"
                                                text={actus[key].description}
                                                textTruncateChild={
                                                    (actus[key].ext && actus[key].ext !== '') ? <a className='savoir-plus' href={actus[key].ext} target="_blank">Vers l'article</a> : <a className='savoir-plus' onClick={openModal}>Lire plus</a>
                                                }
                                            />
                                        </div>
                                        <div className="bottom"></div>
                                    </div>
                                </div>
                                {
                                    modalActus && (
                                        <div className="modal-container" onClick={closeModal}>
                                            <div className="modal-wrapper">
                                                <div className="img-wrapper">
                                                    <img src={actus[key].imgUrl} alt={actus[key].title} />
                                                </div>
                                                <div className="middle">
                                                    <h4 className='modal-title'>{actus[key].title}</h4>
                                                    <div className="modal-date">{actus[key].date}</div>
                                                    <div className="modal-desc">{actus[key].description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Actus