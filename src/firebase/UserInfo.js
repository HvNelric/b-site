import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

export const getUser = () => {
    const user = auth.currentUser
    return user
}

export const getOnAuthChange = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return user
        } else {
            return null
        }
    });
}