import React from 'react';
import { Heading, Button, Text, Flex, Box } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ChangeUserRole from '../../components/UserRole';
import SickReportDatePicker from '../../components/SickReportRecord';
import IllnessReportsDisplay from '../../components/IllnessReportsDisplay';
import { MdExitToApp } from "react-icons/md";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
            navigate("/");
    }

    return (
        <div>
            <Heading my="10" display="flex" justifyContent="center" size="4xl">{`Herzlich Willkommen ${user?.username || ''} `}👋</Heading>

            <Flex justify="space-between">
                <Text ml="15px" fontSize="2xl" color="gray.700" fontWeight="semibold" lineHeight="1.3">
                    Neue Aufgaben warten heute auf Sie.
                    Starten Sie jetzt Ihre{" "}
                    <Link to="/task" style={{ color: "#3182CE", fontWeight: "600", textDecoration: "underline" }}>
                        Aufgaben
                    </Link>{" "}
                    und bleiben Sie produktiv 👷‍♂️
                </Text>

                <Button mr="50px" onClick={handleLogout} colorScheme="pink" variant="solid">
                    <Text mr="2px">Abmelden</Text> {<MdExitToApp/>}
                </Button>

            </Flex>
            <Flex justify="center" align="center" maxH="100vh" >
                <Flex  >
                    {user?.role === "admin" ? <SickReportDatePicker /> : null}

                    <br /><br />
                    {user?.role === "admin" ? <ChangeUserRole /> : null}
                </Flex>
            </Flex>

            <hr style={{ width: "90%", margin: "0 auto" }} />

            <Flex justify="center" align="center" maxH="100vh" my="25px">
                <IllnessReportsDisplay user={user} />
            </Flex>

        </div>
    );
}

export default Profile;
