import React, { useRef, useState } from 'react';
import './Formulaire.scss';
import emailjs from '@emailjs/browser';

const Formulaire = () => {

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
                            <i className="fa-solid fa-envelope-circle-check"></i>
                            <h2>Contactez nous</h2>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 right-col">
                        <form onSubmit={sendEmail} ref={refForm}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="form-email" className="form-label">Votre email</label>
                                <input ref={refMail} name="from_email" type="email" className="form-control" id="form-mail" required />
                                <div className="form-text input-obligatoire">Ce champs est obligatoire.</div>
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