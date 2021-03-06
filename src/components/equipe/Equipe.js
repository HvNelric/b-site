import { getDatabase, onValue, ref as dataRef } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './Equipe.scss';

const Equipe = ({offset, isdesktop}) => {
  
    const [user, setUser] = useState({
        user1: {},
        user2: {},
        user3: {},
        user4: {}
    })

    useEffect(() => {
        const db = getDatabase();
        const goGet = () => {
            const actusRef = dataRef(db, 'equipe');
            onValue(actusRef, (snapshot) => {
                const data = snapshot.val();
                setUser(data)
            });
        }
        goGet()
        
    }, [])

    return (
        <div id="equipe" className="container-fluid b-g-container b-equipe">
            <h2 style={{ transform: `translateY(-${(offset - 1800) * 0.12}px)` }}>L'équipe</h2>
            <div className="row">
                <div className="col-12 col-md-3 user-col" style={isdesktop ? { transform: `translateY(-${(offset - 1800) * 0.1}px)` } : {transform: 'none'}}>
                    <div className="user-wrapper">
                        <div className="user-img-wrapper">
                            <img src={user['user1'].imgUrl} alt="equipe" />
                        </div>
                        <div className="equipe-content">
                            <h3>Marlène</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Enseignante depuis 11 ans</li>
                                <li className="list-group-item">EFormatrice BAFM d’enseignants de la conduite et de la sécurité routière depuis 4 ans</li>
                                <li className="list-group-item">Animatrice sécurité routière</li>
                                <li className="list-group-item">Jury aux examens d’enseignants auto-école</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3 user-col" style={isdesktop ? { transform: `translateY(${(offset - 1800) * 0.1}px)` } : { transform: 'none' }}>
                    <div className="user-wrapper">
                        <div className="user-img-wrapper">
                            <img src={user['user2'].imgUrl} alt="equipe" />
                        </div>
                        <div className="equipe-content">
                            <h3>Anthony</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Dirigeant d’auto-école depuis 7 ans</li>
                                <li className="list-group-item">Enseignant depuis 12 ans</li>
                                <li className="list-group-item">Animateur sécurité routière</li>
                                <li className="list-group-item">Jury aux examens d’enseignants auto-école</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3 user-col" style={isdesktop ? { transform: `translateY(-${(offset - 1800) * 0.1}px)` } : { transform: 'none' }}>
                    <div className="user-wrapper">
                        <div className="user-img-wrapper">
                            <img src={user['user3'].imgUrl} alt="equipe" />
                        </div>
                        <div className="equipe-content">
                            <h3>Des intervenants</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">... en lien avec la sécurité routière (Pompiers, gendarmes, psychologue, etc.)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3 user-col" style={isdesktop ? { transform: `translateY(${(offset - 1800) * 0.1}px)` } : { transform: 'none' }}>
                    <div className="user-wrapper">
                        <div className="user-img-wrapper">
                            <img src={user['user4'].imgUrl} alt="equipe" />
                        </div>
                        <div className="equipe-content">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Un secrétariat pour répondre à vos besoins</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Equipe