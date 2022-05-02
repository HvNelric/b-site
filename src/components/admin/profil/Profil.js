import { updateProfile } from 'firebase/auth'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { auth } from '../../../firebase/Firebase'
import { MyContext } from '../../context/MyContext'
import './Profil.scss'
import imgAnon from '../../../img/anon.jpeg'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDatabase, set } from 'firebase/database'

const Profil = () => {

    const context = useContext(MyContext)
    const { userState, setLog } = context
    const storage = getStorage();
    const db = getDatabase();

    const [user, setUser] = useState({
        pseudo: '',
        img: ''
    })

    const { pseudo, img } = user

    const submitImg = e => {
        e.preventDefault()

        const file = e.target[0].files[0];

        const storageRef = ref(storage, `profile/${file.name}`);
        const deleteRef = ref(storage, `profile/${auth.currentUser.photoURL.split('%2F')[1].split('?alt=')[0]}`);

        deleteObject(deleteRef).then(() => {
            console.log('DELETED')
        }).catch((error) => {
            console.log('delete error', error)
        });

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                //console.log('Uploaded a blob or file!', snapshot);
                ///////////////////
                getDownloadURL(ref(storage, `profile/${file.name}`)).then((url) => {
                    
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        setLog({
                            ...userState,
                            info: auth.currentUser
                        });
                        e.target.reset()
                    }).catch((error) => {
                        console.log('PROFILE ERROR', error)
                    });
                    
                }).catch((error) => {
                        // Handle any errors
                });
                //////////////////
            }).catch(error => {
                console.log('ERROR : ', error)
            });
    }

    const submitPseudo = e => {
        e.preventDefault()

        updateProfile(auth.currentUser, {
            displayName: e.target[0].value
        }).then(() => {
            setLog({
                ...userState,
                info: auth.currentUser
            })
            console.log('etarget', e.target[0].value)
            e.target.reset();
        }).catch((error) => {
            console.log('PROFILE ERROR', error)
        });
    }

    return (
        <div className="container-fluid b-dg-container b-profil">
            <div className="container">
                <div className="row b-profil">
                    <h3>Gestion Profile</h3>
                    <div className="col-12 col-md-4">
                        <div className="img-wrapper">
                            <img src={userState.info.photoURL || imgAnon} alt={userState.info.displayName} />
                            <div className="profil-pseudo">
                                {userState.info.displayName || 'Anon'}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        {/* <form onSubmit={submitImg}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="img-file" className="form-label">Modifier la photo de profil</label>
                                <input onChange={handleFile} type="text" className="form-control" id="img-file" />
                            </div>
                            <button className="btn b-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form> */}

                        <form onSubmit={submitImg}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="img" className="form-label">Titre</label>
                                <input type="file" className="form-control" id="img" required />
                            </div>
                            <button className="btn b-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>

                        <form onSubmit={submitPseudo}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="pseudo" className="form-label">Modifier le pseudo</label>
                                <input type="text" className="form-control" id="pseudo" required />
                            </div>
                            <button className="btn b-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profil