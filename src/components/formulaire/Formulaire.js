import React, { useRef, useState } from 'react';
import './Formulaire.scss';
import emailjs from '@emailjs/browser';

const Formulaire = ({offset, isdesktop}) => {

    const refForm = useRef();
    const refMail = useRef();
    const refNom = useRef();
    const refTel = useRef();
    const refComment = useRef();

    const [success, setSuccess] = useState(false)

    const fnSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 5000)
    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7p38bvd', 'template_l5aepgo', refForm.current, 'PZlTJrISTGSw-qV1n')
            .then((result) => {
                console.log(result.text);
                e.target.reset()
                fnSuccess();
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div id="contact" className='container-fluid b-lg-container form-container'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 left-col">
                        <div className='wrapper'>
                            <i className="fa-solid fa-envelope-circle-check" style={{transform: `translateY(-${(offset - 2900) * .12})`}}></i>
                            <h2 style={isdesktop ? { transform: `translateY(-${(offset - 2900) * .1})` } : {transform: 'none'}}>Contactez nous</h2>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 right-col" style={isdesktop ? {transform: `translateY(${(offset - 2900) * 0.1}px)`} : {transform: 'none'}}>
                        <form onSubmit={sendEmail} ref={refForm}>
                            <div className="mb-3 form-elem">
                                <input ref={refMail} placeholder="Email" name="from_email" type="email" className="form-control" id="form-mail" required />
                                <div className="form-text input-obligatoire">Ce champs est obligatoire.</div>
                            </div>
                            <div className="mb-3 form-elem">
                                <input ref={refNom} placeholder="Prénom et Nom" name="from_nom" type="text" className="form-control" id="nom" />
                            </div>
                            <div className="mb-3 form-elem form-tel">
                                <input ref={refTel} placeholder="Numéro de téléphone" name="from_tel" type="text" className="form-control" id="tel" />
                            </div>
                            <div className="mb-3 form-elem">
                                <textarea ref={refComment} placeholder="Commentaire" name="message" className="form-control" id="comment" rows="8" required></textarea>
                                <div className="form-text input-obligatoire">Ce champs est obligatoire.</div>
                            </div>
                            <button className="btn mt-2 b-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            {
                success && (
                    <div className="success-wrapper">
                        <div className="icon">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <div className="success-msg">
                            Votre message a bien été envoyé.
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Formulaire