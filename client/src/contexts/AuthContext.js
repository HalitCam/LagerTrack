import { useState, createContext, useContext, useEffect } from 'react';
import { fetchLogout, fetchMe } from '../api';
import { Flex, Spinner } from '@chakra-ui/react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe();
                setLoggedIn(true);
                setUser(me);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })()

    }, [])

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);

    }
    const logout = async () => {
        setLoggedIn(false);
        setUser(null);

        // If there's no refresh token, skip calling API to avoid 400 errors.
        const refreshToken = localStorage.getItem('refresh-token');
        if (refreshToken) {
            try {
                await fetchLogout();
            } catch (e) {
                console.error('Logout request failed:', e);
            }
        }

        // Always remove tokens locally
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

    }

    const values = {
        loggedIn,
        user,
        login,
        setLoggedIn,
        logout,
    }
    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner thickness="4px" emptyColor="gray.200" speed="0.65s" color="blue.500" size="xl" />
            </Flex>
        )
    }
    return <AuthContext.Provider value={values} >{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };