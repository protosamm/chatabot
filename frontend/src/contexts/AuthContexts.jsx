import API from '../services/api'
import { useEffect, useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setLoading] = useState(true);

    const checkAuth = async () => {
    
        try {
            const res = await API.get('/auth/me')

            setUser(res.data.user);
        } catch (error) {
            localStorage.removeItem('chatabot-token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{ checkAuth(); }, [])

    
    const signOut = () => {
        localStorage.removeItem('chatabot-token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value = {{ user, setUser, userLoading, signOut}}>
            { children }
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);