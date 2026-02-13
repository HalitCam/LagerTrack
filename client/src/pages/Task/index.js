import React from 'react';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '../../api';
import { Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";
import { useBasketContext } from '../../contexts/BasketContext';
import moment from 'moment';



const Task = () => {
    const { loggedIn } = useAuth();
    const { addToBasket } = useBasketContext();

    const { isLoading, isError, data, error } = useQuery({ queryKey: ['admin:task'], queryFn: fetchTask });
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
        ...(loggedIn
            ? [{
                title: 'Aktion',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <>
                        <Button onClick={() => addToBasket(record._id)}>Übernahme</Button>
                    </>
                )
            }]
            : [])

    ]

    return (
        <div>
            <Text fontSize="2xl" p="5">Aufgaben</Text>
            <Table dataSource={data.map(item => ({...item, createdAt: moment(item.createdAt).format('DD/MM/YYYY')}))} columns={columns} rowKey="_id" />
        </div>
    )
        ;
}

export default Task;
