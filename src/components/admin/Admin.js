import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import './Admin.scss'
import Profil from './profil/Profil';
import GestionActus from './gestion.actus/GestionActus';
import GestionEquipe from './gestion.equipe/GestionEquipe';

const Admin = () => {

    const context = useContext(MyContext)
    const { userState } = context
    
    const components = userState.isLog
    ? (
        <>
            <h2>ADMIN</h2>
            <Profil />
            <GestionActus />
            <GestionEquipe />
        </> 
    ): (
        <h2>Connectez-vous</h2>
    )

    return (
          components
        )
}

export default Admin