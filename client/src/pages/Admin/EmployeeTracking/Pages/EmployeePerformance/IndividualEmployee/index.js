import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTask, fetchUser } from '../../../../../../api';
import PerformanceEmployee from '../../../../../../components/PerformanceEmployee/index';
import { Text, Flex, Spinner, } from '@chakra-ui/react';
import { Row, Col } from 'antd';
import DateRangePicker from '../components/dateRangePicker';

const IndividualEmployee = () => {
    const { data: tasks, isLoading, error, isError } = useQuery({
        queryKey: ["tasks:invidual"],
        queryFn: fetchTask
    })
    const { data: users } = useQuery({
        queryKey: ["users:invidual"],
        queryFn: fetchUser
    })
    const { id } = useParams();
    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="100vh" >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Flex >
        )
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const user = users?.find(user => user._id === id);
    const tasksBy = user
        ? (tasks?.filter(task => task.responsible === user._id) || []) : [];


    return (
        <div>
            {user && (
                <Text
                    fontSize="2xl"
                    color="blue.400"
                    textAlign="center"
                    m={10}
                    textShadow="1px 1px 2px gray"
                >
                    {user.username}s Leistung
                </Text>
            )}
            <Flex justify="center" align="center" >
                <PerformanceEmployee tasks={tasksBy} user={user} />
            </Flex>
            <Flex justify="center" align="center" mt={35} >
                <DateRangePicker data={tasksBy} />
            </Flex>
        </div>
    );
}

export default IndividualEmployee;
