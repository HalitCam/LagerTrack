import React, { useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTask, fetchUpdateTask } from '../../../api';
import { Text ,Button } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import moment from 'moment';

const GetTasks = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { isLoading, isError, data, error } = useQuery({ queryKey: ['tasks'], queryFn: fetchTask, refetchOnMount: true });

    const dataResponsibleFiltered = data?.filter((item) => (item.responsible === user._id && item.completed !== true));

    const backTaskMutation = useMutation({
        mutationFn: ({id,data})=> fetchUpdateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin:task']);
        }
    })

    const completeMutation  = useMutation({
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
                const giveBackTask = async () => {
                    backTaskMutation.mutate({id: record._id, data:{responsible : null}})
                }

                const handleCompleted = async () => {

                    completeMutation.mutate({ id: record._id, data: { completed: true } });
                };

                return (
                    <>
                        <Popconfirm
                         title="Bestätigen !"
                            description="Wirklich fertig?"
                             okText="Ja"
                            cancelText="Nein"
                            onConfirm={handleCompleted}
                        >
                            <Button colorScheme='green' > fertig </Button>

                        </Popconfirm>

                         <Popconfirm
                         title="Zurückgeben !"
                            description="Aufgabe ablehnen ?"
                             okText="Ja"
                            cancelText="Nein"
                            onConfirm={giveBackTask}
                        >
                            <Button ml={5} colorScheme='red'> ablehnen </Button>

                        </Popconfirm>
                    </>
                )
            }
        },
    ]

    return (
        <div>
            <Text fontSize="2xl" p="5">Meine Aufgaben ({user.username})</Text>
            <Table dataSource={dataResponsibleFiltered.map(item => ({
                ...item,
                createdAt: moment(item.createdAt).format('DD/MM/YYYY')
            }))} columns={columns} rowKey="_id" />
        </div>

    );
}

export default GetTasks;
