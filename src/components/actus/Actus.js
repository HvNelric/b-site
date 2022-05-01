import { get, ref, getDatabase, child } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Actus.scss';

const Actus = () => {

    const dbRef = ref(getDatabase());
    const [actus, setActus] = useState({})

    const goGet = () => {
        get(
            dbRef, '/actus'
        ).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('SNAP : ', snapshot.val().actus)
                setActus(snapshot.val().actus)
            } else {
                console.log("No actus available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        goGet()
    }, [])

    return (
        <div className="container-fluid b-dg-container b-actus">
            <div className="container">
                <h2 className='text-center'>Actualités</h2>
                <div className="row actus-elem">
                    {
                        Object.keys(actus).map(key => (
                            <div className='col-12 col-md-4 elem-col' key={key}>
                                <div className='actu-wrapper'>
                                    <div className="top">
                                        <div className="img-wrapper">
                                            <img src={actus[key].imgUrl} alt="car" />
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <h4>{actus[key].title}</h4>
                                        <div className="date">{actus[key].date}</div>
                                        <div className="desc">{actus[key].description}</div>
                                    </div>
                                    <div className="bottom"></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Actus