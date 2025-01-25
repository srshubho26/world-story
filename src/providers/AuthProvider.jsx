import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { toast } from 'react-toastify';
import Loading from '../components/Loading/Loading';

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

    const logout = () => signOut(auth);

    const values = { user, login, logout }

    return (<AuthContext.Provider value={values}>
        <Loading loading={loading} />
        {!loading && children}
    </AuthContext.Provider>);
};

AuthProvider.propTypes = {
    children: PropTypes.array
};

export default AuthProvider;