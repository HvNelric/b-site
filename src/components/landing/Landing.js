import React, { useContext, useEffect, useRef, useState } from 'react';
import Actus from '../actus/Actus';
import Equipe from '../equipe/Equipe';
import Formulaire from '../formulaire/Formulaire';
import imgLanding from '../../img/img41.jpg'
import './Landing.scss'

const Landing = () => {

    const [offset, setOffset] = useState()
    const [isdesktop, setIsdesktop] = useState(true)

    const handleScroll = () => {
        setOffset(window.pageYOffset)
        //console.log('scroll', window.pageYOffset)
    }

    const handleResize = () => {
        const width = window.screen.width;
        //console.log('resize', )
        if (width < 992) {
            setIsdesktop(false)
        } else {
            setIsdesktop(true)
        }
        
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)
        handleResize();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            <div className='container-fuid p-0 b-landing' style={{ backgroundImage: `url(${imgLanding})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
                <h1 className='landing-title' style={{ transform: `translate(-50%,${offset * 0.1}px)` }}>
                    Votre réussite,
                    <div className='title-bis'>notre succès !</div>
                </h1>
                <div className="landing-etape">
                    <div className="elem" style={{ transform: `translateY(-${offset * 0.2}px)` }}>
                        Formation personnalisée
                    </div>
                    <i className="fa-solid fa-arrows-left-right" style={{ transform: `translateY(-${offset * 0.25}px)` }}></i>
                    <div className="elem" style={{ transform: `translateY(-${offset * 0.3}px)` }}>
                        Financement adaptée
                    </div>
                    <i className="fa-solid fa-arrows-left-right" style={{ transform: `translateY(-${offset * 0.15}px)` }}></i>
                    <div className="elem" style={{ transform: `translateY(-${offset * 0.2}px)` }}>
                        Méthodes évoluées
                    </div>
                </div>
            </div>
            <Actus offset={offset} />
            <Equipe offset={offset} isdesktop={isdesktop} />
            <Formulaire offset={offset} isdesktop={isdesktop } />
        </>
    )
}

export default Landing