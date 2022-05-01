import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Admin from './components/admin/Admin';
import Inscription from './components/connexions/Inscription';
import Login from './components/connexions/Login';
import { MyContext } from './components/context/MyContext';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import { auth } from './firebase/Firebase';
import './fonts/PlayfairDisplay-Black.ttf'
import './fonts/SourceSansPro-Regular.ttf'

function App() {

    const [userState, setLog] = useState({
        isLog: false,
        info: {}
    })

    useEffect(() => {
        const authCange = onAuthStateChanged(auth, (user) => {
            console.log('HOme')
            if (user) {
                setLog({
                    ...userState,
                    isLog: true,
                    info: user
                })
            }
        });
        return () => authCange;
    }, [])

    return (
        <MyContext.Provider value={{ userState, setLog }}>
            
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path='/login' element={<Login />} />
                <Route path='/godmode' element={<Admin />} />
            </Routes>
            <Navbar />
        </MyContext.Provider>
    );
}

export default App;
