import React, { useState } from 'react';
import './Inscription.scss';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {

    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        email: '',
        pwd: '',
        confirmPwd: ''
    })

    const [error, setError] = useState('')

    const {email, pwd, confirmPwd} = formState

    const handleEmail = (e) => {
        setFormState({ ...formState, email: e.target.value})
    }

    const handlePwd = (e) => {
        setFormState({ ...formState, pwd: e.target.value })
    }

    const handleConfirmPwd = (e) => {
        setFormState({ ...formState, confirmPwd: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate('/godmode')
        })
        .catch((error) => 
            //console.log('ERROR', error.message)
            setError(error.message)
        );
    }

    const htmlBtn = (email !== '' && pwd !== '' && confirmPwd !== '' && pwd === confirmPwd) ? <button className='btn b-btn'><i className="fa-solid fa-paper-plane"></i></button> : <button className='btn b-btn' disabled><i className="fa-solid fa-paper-plane"></i></button>;

    return (
        <div className='container-fluid p-0 ins-container'>
            <div className="ins-box">
                <h3>Inscription</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={handleEmail} type="email" value={email} className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input onChange={handlePwd} type="password" className="form-control" id="pass" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmpass" className="form-label">Password</label>
                        <input onChange={handleConfirmPwd} type="password" className="form-control" id="confirmpass" />
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

export default Inscription