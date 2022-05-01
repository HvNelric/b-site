import React, { useContext, useEffect } from 'react';
import imgLanding from '../../img/img41.jpg'
import Actus from '../actus/Actus';
import Equipe from '../equipe/Equipe';
import './Landing.scss'

const Landing = () => {



    return (
        <>
            <div className='container-fuid p-0 b-landing' style={{ backgroundImage: `url(${imgLanding})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
                <h1 className='landing-title'>
                    Votre réussite,
                    <div className='title-bis'>notre succès !</div>
                </h1>
            </div>
            <Actus />
            <Equipe />
        </>
    )
}

export default Landing