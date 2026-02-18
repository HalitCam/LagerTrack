import React, { useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTask, fetchUpdateTask, fetchDeleteTask } from '../../api';
import { Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";
import { useBasketContext } from '../../contexts/BasketContext';
import moment from 'moment';




const Task = () => {
    const { loggedIn, user } = useAuth();
    const { addToBasket } = useBasketContext();
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['admin:task'], queryFn: fetchTask, refetchOnMount: true });

    const takeMutation = useMutation({
        mutationFn: ({ id, body }) => fetchUpdateTask(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin:task']);
        }
    });
    const deleteMutation = useMutation ({
        mutationFn: (id) => fetchDeleteTask (id) ,
        onSuccess : () => {
            queryClient.invalidateQueries("task");
        }
    })  

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
        ...(loggedIn
            ? [{
                title: 'Aktion',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    const handleTake = async () => {
                        // set responsible to current user
                        if (!user || !user._id) return;
                        takeMutation.mutate({ id: record._id, body: { responsible: user._id } });
                        addToBasket(record._id);
                    };
                    const deleteTask = async() => {
                        deleteMutation.mutate(record._id);
                    }

                    return (
                        <>
                            <Button colorScheme='green' variant="ghost" onClick={handleTake}> Übernahme</Button>
                            {
                                user.role === "admin" ? (
                                    <Popconfirm
                                    title="Wirklich löschen?"
                                    description="Sind Sie sicher, diese Aufgabe zu löschen?"
                                    cancelText="Nein" 
                                    okText="Ja"
                                    onConfirm={deleteTask}
                                    >
                                        <Button ml="5" colorScheme='red' variant="ghost" > Löschen </Button>
                                    </Popconfirm>
                                ) : null
                            }
                        </>
                    )
                }
            }]
            : [])

    ]



    return (
        <div>
            <Text fontSize="2xl" p="5">Aufgaben</Text>
            <Table dataSource={data
                .filter(item => !item.responsible)
                .map(item => ({
                    ...item,
                    createdAt: moment(item.createdAt).format('DD/MM/YYYY')
                }))} columns={columns} rowKey="_id" />
        </div>
    )
        ;
}

export default Task;
