import React, { useContext, useEffect } from 'react'
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import './Admin.scss'
import Profil from './profil/Profil';
import GestionActus from './gestion.actus/GestionActus';

const Admin = () => {

    const navigate = useNavigate()
    const context = useContext(MyContext)

    const { userState } = context
    console.log('STATE : ', userState.isLog)

    useEffect(() => {
      
        window.scrollTo(0, 0)

    }, [])
    
    const components = userState.isLog
    ? (
        <>
            <h2>ADMIN</h2>
            <Profil />
            <GestionActus />
        </> 
    ): (
        <h2>Connectez-vous</h2>
    )

    return (
          components
        )
}

export default Admin