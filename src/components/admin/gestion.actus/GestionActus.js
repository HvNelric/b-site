import React, { useEffect, useRef, useState } from 'react'
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, uploadBytes, ref as fireRef, getDownloadURL, deleteObject } from "firebase/storage";
import 'firebase/storage'
import 'firebase/firestore';
import './GestionActus.scss';
import TextTruncate from 'react-text-truncate';

const GestionActus = () => {

    const refTitle = useRef();
    const refDate = useRef();
    const refDesc = useRef();
    const refFile = useRef();
    const refExt = useRef();
    const refTruncate = useRef();

    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const storage = getStorage();

    const [data, setData] = useState({})

    const submitActu = e => {
        e.preventDefault()

        const file = e.target[0].files[0];
        //console.log('file', file);
        const storageRef = fireRef(storage, `actus/${file.name}`);

        const formatDate = new Date(refDate.current.value);
        const newDate = `${formatDate.getDate() < 9 ? '0' + formatDate.getDate() : formatDate.getDate()}-${(formatDate.getMonth() + 1) < 9 ? '0' + formatDate.getMonth() : formatDate.getMonth()}-${formatDate.getFullYear()}`

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                //console.log('Uploaded a blob or file!', snapshot);
                ///////////////////
                getDownloadURL(fireRef(storage, `actus/${file.name}`)).then((url) => {
                    //console.log('URL', url)
                    const imgUrl = url;
                    set(ref(db, 'actus/' + Date.now()), {
                        title: refTitle.current.value,
                        date: newDate,//refDate.current.value,
                        description: refDesc.current.value,
                        imgUrl: imgUrl,
                        fileName: file.name,
                        ext: refExt.current.value
                    }).then(() => {
                        goGet();
                        e.target.reset();
                    });
                })
                .catch((error) => {
                    // Handle any errors
                });
                //////////////////
            }).catch(error => {
                console.log('ERROR : ', error)
            });
    }

    const deleteElem = (id, fileName) => {

        const deleteRef = fireRef(storage, `actus/${fileName}`);

        deleteObject(deleteRef).then(() => {
            console.log('DELETED')
        }).catch((error) => {
            console.log('delete error', error)
        });

        set(
            ref(
                db, 'actus/' + id), null
        ).then(() => {
            goGet()
        });
    }

    const goGet = () => {
        get(
            dbRef, 'actus/'
        ).then((snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val().actus)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        goGet()
    }, []);

    return (
        <div className='container-fluid b-g-container b-gestion-actus'>
            <div className="container">
                <div className="row">
                    <h3>Gestion des actualités</h3>
                    <div className="gestion-formulaire">
                        <form onSubmit={submitActu}>
                            <div className="mb-3 form-elem">
                                <label htmlFor="article-img" className="form-label">Photo de l'article'</label>
                                <input ref={refFile} type="file" className="form-control" id="article-img" required />
                            </div>
                            <div className="mb-3 form-elem">
                                <label htmlFor="title" className="form-label">Titre</label>
                                <input ref={refTitle} type="text" className="form-control" id="title" required />
                            </div>
                            <div className="mb-3 form-elem form-date">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input ref={refDate} type="date" className="form-control" id="date" required />
                            </div>
                            <div className="mb-3 form-elem">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <textarea ref={refDesc} className="form-control" id="desc" rows="8"></textarea>
                            </div>
                            <div className="mb-3 form-elem">
                                <label htmlFor="ext-link" className="form-label">Lien externe (optionnel)</label>
                                <input ref={refExt} type="text" className="form-control" id="ext-link" />
                            </div>
                            <button className="btn b-btn"><i className="fa-solid fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
                <div className="row gestion-elem">
                    {
                        Object.keys(data).map(key => (
                            <div className='col-12 col-md-4 elem-col' key={key}>
                                <div className='actu-wrapper'>
                                    <div className="top">
                                        <div className="img-wrapper">
                                            <img src={data[key].imgUrl} alt="car" />
                                        </div>
                                        <div onClick={() => deleteElem(key, data[key].fileName)} className='delete-btn'><i className="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <div className="middle">
                                        <h4>{data[key].title}</h4>
                                        <div className="date">{data[key].date}</div>
                                        <div className="desc">{data[key].description}</div>
                                        {
                                            (data[key].ext && data[key].ext !== '') && <a className='savoir-plus' href={data[key].ext} target="_blank">Vers l'article</a>
                                        }
                                    </div>
                                    <div className="bottom"></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GestionActus