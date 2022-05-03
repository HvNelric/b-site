import { getDatabase, onValue, orderByValue, query, ref } from 'firebase/database';
//import React from 'react'

export const goGet = () => {

    const db = getDatabase();

    const actusRef = ref(db, 'actus');
    onValue(actusRef, (snapshot) => {
        const data = snapshot.val();
        console.log('SNAP : ', data)
        return data
        //setActus(data)
    });
}