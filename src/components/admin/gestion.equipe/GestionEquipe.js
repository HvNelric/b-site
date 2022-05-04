import { set, ref as dataRef, getDatabase, get } from 'firebase/database';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import './GestionEquipe.scss'

const GestionEquipe = () => {

    const storage = getStorage();
    const db = getDatabase();
    const dbRef = dataRef(getDatabase());

    const [user, setUser] = useState({
        user1: {},
        user2: {}
    })

    const submitImg = (e, id) => {
        e.preventDefault()

        const file = e.target[0].files[0];
        const storageRef = ref(storage, `equipe/${file.name}`);
        if (user[id].fileName && user[id].fileName !== '') {
            const deleteRef = ref(storage, `equipe/${user[id].fileName}`); 
            //console.log('objet', user[id].fileName);

            deleteObject(deleteRef).then(() => {
                console.log('DELETED equipe')
            }).catch((error) => {
                console.log('delete error', error)
            });
        }

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                //console.log('Uploaded', snapshot);
                ///////////////////
                getDownloadURL(ref(storage, `equipe/${file.name}`)).then((url) => {
                    const getUrl = url  
                    //console.log('get url', getUrl)
                    set(dataRef(db, `equipe/${id}`), {
                        imgUrl: getUrl,
                        fileName: file.name
                    }).then(() => {
                        //console.log('SET')
                        goGet();
                        e.target.reset();
                    }).catch(error => {
                        console.log('SET ERROR : ', error)
                    });
                }).catch((error) => {
                    // Handle any errors
                });
                //////////////////
            }).catch(error => {
                 console.log('ERROR : ', error)
            });
    }

    const goGet = () => {
        get(
           dbRef, 'equipe/'
        ).then((snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.val().equipe)
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
        <div className="container-fluid b-g-container gestion-equipe">
            <div className="container">
                <div className="form-container">
                    <form onSubmit={e => submitImg(e, 'user1')}>
                        <div className="mb-3 form-elem form-user">
                            <label htmlFor="user1" className="form-label">User 1</label>
                            <input type="file" className="form-control" id="user1" required />
                        </div>
                        <button className="btn b-btn">Update user 1</button>
                    </form>
                    <form onSubmit={e => submitImg(e, 'user2')}>
                        <div className="mb-3 form-elem form-user">
                            <label htmlFor="user2" className="form-label">User 2</label>
                            <input type="file" className="form-control" id="user2" required />
                        </div>
                        <button className="btn b-btn">Update user 2</button>
                    </form>
                    <form onSubmit={e => submitImg(e, 'user3')}>
                        <div className="mb-3 form-elem form-user">
                            <label htmlFor="user3" className="form-label">User 3</label>
                            <input type="file" className="form-control" id="user3" required />
                        </div>
                        <button className="btn b-btn">Update user 3</button>
                    </form>
                    <form onSubmit={e => submitImg(e, 'user4')}>
                        <div className="mb-3 form-elem form-user">
                            <label htmlFor="user4" className="form-label">User 4</label>
                            <input type="file" className="form-control" id="user4" required />
                        </div>
                        <button className="btn b-btn">Update user 4</button>
                    </form>
                </div>
                <div className="row mt-5">
                    {
                        Object.keys(user).map(key => (
                            <div className="col-12 col-md-3 user-col" key={key}>
                                <div className="img-wrapper">
                                    <img src={user[key].imgUrl} alt="" />
                                </div>
                                <h3>{key}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GestionEquipe