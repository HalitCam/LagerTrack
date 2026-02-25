import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Flex } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTask, fetchUpdateTask, fetchDeleteTask } from '../../api';
import { Text, Button, Input } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useBasketContext } from '../../contexts/BasketContext';
import moment from 'moment';
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Spinner } from '@chakra-ui/react'

const Task = () => {
    const { loggedIn, user } = useAuth();
    const isAdmin = user?.role === "admin";
    const { addToBasket } = useBasketContext();
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['admin:task'], queryFn: fetchTask, refetchOnMount: true });

    const [priorityMap, setPriorityMap] = useState({});
    
    const takeMutation = useMutation({
        mutationFn: ({ id, body }) => fetchUpdateTask(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin:task']);
        }
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => fetchDeleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin:task']);

        }
    })
    const updateIndexMutation = useMutation({
        mutationFn: ({ task_id, input }) => fetchUpdateTask(task_id, input),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['admin:task']);

            const { task_id } = variables;

            setPriorityMap(prev => {
                const copy = { ...prev };
                delete copy[task_id];
                return copy;
            });
        }
    })

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


    const columns = [
        {
            title: "Priorität",
            dataIndex: "priority",
            key: "priority",
            render: (text, record) => (
                <Input
                    disabled={!isAdmin}
                    style={{
                        borderRadius: "100px",
                        padding: "0 20px",
                        height: "45px"
                    }}
                    color="red.600"
                    value={
                        priorityMap[record._id] !== undefined
                            ? priorityMap[record._id]
                            : record.priority
                    }
                    width="50px"
                    onChange={(e) => {
                        setPriorityMap(prev => ({
                            ...prev,
                            [record._id]: e.target.value
                        }));
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const newValue = Number(
                                priorityMap[record._id] ?? record.priority
                            );

                            if (isNaN(newValue)) return;

                            updateIndexMutation.mutate({
                                task_id: record._id,
                                input: { priority: newValue }
                            });
                        }
                    }}
                    onBlur={() => {
                        const newValue = Number(
                            priorityMap[record._id] ?? record.priority
                        );

                        if (isNaN(newValue)) return;
                        if (newValue === record.priority) return;

                        updateIndexMutation.mutate({
                            task_id: record._id,
                            input: { priority: newValue }
                        });
                    }}
                />
            )
        },
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
            title: 'Etikettenzustand',
            dataIndex: 'withoutLabel',
            key: 'withoutLabel',
        },
        {
            title: 'Gefahrgut',
            dataIndex: 'danger',
            key: 'danger',
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
                        takeMutation.mutate({
                            id: record._id, body: {
                                responsible: user._id,
                                priority: null
                            }
                        });
                        addToBasket(record._id);

                    };
                    const deleteTask = async () => {
                        deleteMutation.mutate(record._id);
                    }

                    return (
                        <>
                            <Button colorScheme='green' variant="ghost" onClick={handleTake}> Übernahme</Button>
                            {
                                user?.role === "admin" ? (
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
                    createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
                    withoutLabel: item.withoutLabel ? "Ohne (Herstelleretikett) Etikett " : null,
                    danger: item.danger ? <WarningTwoIcon w={8} h={8} color="red.500" /> : null,
                }))} columns={columns} rowKey="_id" />
        </div>
    )
        ;
}

export default Task;
