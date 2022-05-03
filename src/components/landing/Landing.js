import React, { useContext, useEffect, useRef } from 'react';
import imgLanding from '../../img/img41.jpg'
import Actus from '../actus/Actus';
import Equipe from '../equipe/Equipe';
import Formulaire from '../formulaire/Formulaire';
import './Landing.scss'

const Landing = () => {

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    return (
        <>
            <div className='container-fuid p-0 b-landing' style={{ backgroundImage: `url(${imgLanding})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
                <h1 className='landing-title'>
                    Votre réussite,
                    <div className='title-bis'>notre succès !</div>
                </h1>
                <div className="landing-etape">
                    <div className="elem">
                        Formation personnalisée
                    </div>
                    <i className="fa-solid fa-arrows-left-right"></i>
                    <div className="elem">
                        Financement adaptée
                    </div>
                    <i className="fa-solid fa-arrows-left-right"></i>
                    <div className="elem">
                        Méthodes évoluées
                    </div>
                </div>
            </div>
            <Actus />
            <Equipe />
            <Formulaire />
        </>
    )
}

export default Landing