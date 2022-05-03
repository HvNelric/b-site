import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/Firebase'
import { getUser } from '../../firebase/UserInfo'
import { MyContext } from '../context/MyContext'
import './Navbar.scss'
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {

    const context = useContext(MyContext);
    const { userState, setLog } = context;

    const nav = useNavigate()
    const user = getUser() 

    const logout = () => {
        signOut(auth).then(() => {
            setLog({
                ...userState,
                isLog: false
            })
            nav('/')
        }).catch((error) => {
            console.log('NAV ERROR : ', error)
        });
    }

    const html = userState.isLog
        ? (
            <>
                <Link className='nav-link' to='/godmode'>
                    <div className="user-info">
                        <strong>{user.displayName}&nbsp;|&nbsp;</strong>{user.email}
                    </div>
                </Link>
                <button onClick={logout} className='btn btn-danger'><i className="fa-solid fa-right-from-bracket"></i></button>    
            </>
        ) : (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" to='/inscription'>Inscription</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
            </>
        )

    return (
        <nav className="navbar navbar-expand-md navbar-dark b-nav-container">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Bastos Auto-école</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse b-nav" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <HashLink className="nav-link active" to='/#actus'>Actualités</HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link active" to='/#equipe'>Equipe</HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link active" to='/#contact'>Contact</HashLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {html}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar