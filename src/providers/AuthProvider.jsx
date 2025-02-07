import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { toast } from 'react-toastify';
import Loading from '../components/reusuable/Loading';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        }, () => {
            toast.error("Oops! Someting went wrong.");
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

    const updateUser = async (displayName, photoURL) => {
        const updateFields = { displayName, photoURL };
        await updateProfile(auth.currentUser, updateFields);
        setUser({ ...auth.currentUser, ...updateFields });

        return auth.currentUser;
    }

    const register = async (email, pass, name, photoURL = "") => {
        await createUserWithEmailAndPassword(auth, email, pass);
        const res = await updateUser(name, photoURL);
        return res;
    }

    const logout = () => signOut(auth);

    const values = { user, login, updateUser, register, logout }

    return (<AuthContext.Provider value={values}>
        <Loading loading={loading} />
        {!loading && children}
    </AuthContext.Provider>);
};

AuthProvider.propTypes = {
    children: PropTypes.array
};

export default AuthProvider;