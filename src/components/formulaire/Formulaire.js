import React, { useRef } from 'react';
import './Formulaire.scss';
import emailjs from '@emailjs/browser';

const Formulaire = () => {

    const refForm = useRef();
    const refMail = useRef();
    const refNom = useRef();
    const refTel = useRef();
    const refComment = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7p38bvd', 'template_l5aepgo', refForm.current, 'PZlTJrISTGSw-qV1n')
            .then((result) => {
                console.log(result.text);
                
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='container-fluid b-lg-container form-container'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 left-col">
                        <div className='wrapper'>
                            <i className="fa-solid fa-envelope-circle-check"></i>
                            <h2>Contactez nous</h2>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 right-col">
                        <form onSubmit={sendEmail} ref={refForm}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="form-email" className="form-label">Votre email</label>
                                <input ref={refMail} name="from_email" type="email" className="form-control" id="form-mail" required />
                            </div>
                            <div className="mb-3 form-elem">
                                <label htmlFor="nom" className="form-label">Votre Prénom Nom (optionnel)</label>
                                <input ref={refNom} name="from_nom" type="text" className="form-control" id="nom" />
                            </div>
                            <div className="mb-3 form-elem form-tel">
                                <label htmlFor="tel" className="form-label">Votre numéro de téléphone (optionnel)</label>
                                <input ref={refTel} name="from_tel" type="text" className="form-control" id="tel" />
                            </div>
                            <div className="mb-3 form-elem">
                                <label htmlFor="comment" className="form-label">Votre commentaire</label>
                                <textarea ref={refComment} name="message" className="form-control" id="comment" rows="8" required></textarea>
                            </div>
                            <button className="btn b-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formulaire