import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTask, fetchUpdateTask } from '../../../api';
import { Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import moment from 'moment';


const EmployeeTracking = () => {
    
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['user:task'], queryFn: fetchTask, refetchOnMount: true });
    console.log(data)

    const dataResponsibleFiltered = data?.filter ((item) => (item.responsible === user._id && item.completed !== true));

    const mutation = useMutation({
        mutationFn: ({ id, data }) => fetchUpdateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['user:task']);
        }
    });
    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const columns = [
        {
            title: 'Kartonart',
            dataIndex: 'kartonType',
            key: 'kartonType',
        },
        {
            title: 'Titel',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Produktmenge',
            dataIndex: 'productquantity',
            key: 'productquantity',
        },
        {
            title: 'Kartonmenge',
            dataIndex: 'boxquantity',
            key: 'boxquantity',
        },
        {
            title: 'Erstellungszeit',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Aktion',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                const handleCompleted = async () => {

                    mutation.mutate({ id: record._id, data : {completed: true} });
                };

                return (
                    <>
                        <Button onClick={handleCompleted}> fertig </Button>
                    </>
                )
            }
        },
    ]
    
    return (
        <div>
            EmployeeTracking
        </div>
    );
}

export default EmployeeTracking;
