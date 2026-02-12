import React from 'react';
import {Heading, Button} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout(()=>{
            navigate("/");
        });
    }
    return (
        <div>
            <Heading my="10" display="flex" justifyContent="center" size="2xl">{`Herzlich willkommen ${user?.email || ''} `}</Heading>
            {user && <code>{JSON.stringify(user)}</code>}
            <br /><br />
            <Button onClick={handleLogout} colorScheme="pink" variant="solid">
                Abmelden
            </Button>
        </div>
    );
}

export default Profile;
