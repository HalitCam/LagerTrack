import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTask, fetchUser } from '../../../../../../api';
import PerformanceEmployee from '../../../../../../components/PerformanceEmployee/index';
import { Text,Flex } from '@chakra-ui/react';
import { Row, Col} from 'antd';



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

    const  user = users?.find(user => user._id === id);
    const tasksBy = tasks?.filter(task => task.responsible && task.responsible === user._id)


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
            <Flex justify="center" align="center">
                <PerformanceEmployee style={{justifyContent:"center", alignItems:"center"}}  tasks={tasksBy} user={user} />
            </Flex>


            
        </div>
    );
}

export default IndividualEmployee;
