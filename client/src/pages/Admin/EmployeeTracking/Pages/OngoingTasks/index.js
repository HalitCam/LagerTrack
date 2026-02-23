import React from 'react';
import { Table, Popconfirm } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTask, fetchDeleteTask, fetchUser} from '../../../../../api';
import { Text, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { WarningTwoIcon } from "@chakra-ui/icons";

const OngoingTasks = () => {
    const queryClient = useQueryClient();

     const {data: users} = useQuery({queryKey:["users-liste"], queryFn: fetchUser  })

    const { isLoading, isError, data : tasks, error } = useQuery({ queryKey: ['admin:ongoing-task'], queryFn: fetchTask, refetchOnMount: true });

    const ongoingTasks = tasks?.filter((task) => task.completed === false && task.responsible !== null )

    const deleteMutation = useMutation({
        mutationFn: (id) => fetchDeleteTask(id),
        onSuccess: () => {
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
            title :'Mitarbeiter',
            dataIndex: 'employee',
            key: 'employee',
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
        {
            title: 'Aktion',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                const deleteTask = async () => {
                    deleteMutation.mutate(record._id);
                }

                return (
                    <Popconfirm
                        title="Wirklich löschen?"
                        description="Sind Sie sicher, diese Aufgabe zu löschen?"
                        cancelText="Nein"
                        okText="Ja"
                        onConfirm={deleteTask}
                    >
                        <Button ml="5" colorScheme='red' variant="ghost" > Löschen </Button>
                    </Popconfirm>
                )
            }
        },
    ]



    return (
        <div>
            <Text fontSize="2xl" p="5">Laufende Aufgaben</Text>
            <Table dataSource={ongoingTasks
                .map(item => ({
                    ...item,
                    createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
                    withoutLabel: item.withoutLabel ? "Ohne (Herstelleretikett) Etikett " : null,
                    danger: item.danger ? <WarningTwoIcon w={8} h={8} color="red.500" /> : null,
                    employee: (users.find(user => user._id === item.responsible)).username
            
                }))} columns={columns} rowKey="_id" />

                <Text color="red.400" fontSize="xl"  as="bold" >Anzahl der laufenden Aufgaben : {ongoingTasks.length} </Text>
        </div>
        
    )
        ;
}

export default OngoingTasks;
