import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';

const Login = () => {

    const navigate = useNavigate();

    const context = useContext(MyContext)
    const {userState, setLog} = context

    const [state, setState] = useState({
        email: '',
        pwd: ''
    })
    const { email, pwd } = state

    const [error, setError] = useState('')

    const handleEmail = (e) => {
        setState({ ...state, email: e.target.value })
    }

    const handlePwd = (e) => {
        setState({ ...state, pwd: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pwd)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('LOGIN USER', user)
            setLog({
                ...userState,
                isLog: true,
                info: user
            })
            navigate('/godmode')
        })
        .catch((error) => {
            setError(error.message)
        });
    }

    const htmlBtn = (email !== '' && pwd !== '') ? <button className='btn b-btn'><i className="fa-solid fa-paper-plane"></i></button> : <button className='btn b-btn' disabled><i className="fa-solid fa-paper-plane"></i></button>

    return (
        <div className='container-fluid p-0 ins-container'>
            <div className="ins-box">
                <h3>Connexion</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={handleEmail} type="email" value={email} className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input onChange={handlePwd} type="password" value={pwd} className="form-control" id="pass" />
                    </div>
                    {htmlBtn}
                </form>
                <div className="mt-2">
                    <strong className='text-danger'>{error}</strong>
                </div>
            </div>
        </div>
    )
}

export default Login