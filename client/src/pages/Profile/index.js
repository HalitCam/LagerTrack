import React from 'react';
import { Heading, Button, Text, Flex, Box } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChangeUserRole from '../../components/UserRole';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout(() => {
            navigate("/");
        });
    }

    return (
        <div>
            <Heading my="10" display="flex" justifyContent="center" size="2xl">{`Herzlich willkommen ${user?.username || ''} `}</Heading>
            {user && <code>{JSON.stringify(user)}</code>}
            <br /><br />
            <ChangeUserRole />
            <hr style={{ width: "90%", margin: "0 auto" }} />


            <Button onClick={handleLogout} colorScheme="pink" variant="solid">
                Abmelden
            </Button>
        </div>
    );
}

export default Profile;
