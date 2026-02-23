import React, { useState, useMemo } from 'react';
import { DatePicker, Table } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Flex, Text, Box, Input } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { fetchTask, fetchUser } from "../../../../../api";
import moment from 'moment';
import { WarningTwoIcon } from '@chakra-ui/icons';

const CompletedTasks = () => {
    const { data: tasks, isLoading, isError, error } = useQuery({ queryKey: ["completed:tasks"], queryFn: fetchTask, refetchOnMount: true });

    const { data: users } = useQuery({ queryKey: ["users-liste"], queryFn: fetchUser });

    dayjs.extend(customParseFormat);
    const dateFormat = 'DD.MM.YYYY';

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [title, setTitle] = useState(null);

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        const completedTasks = tasks.filter(task => task.completed === true && task.responsible !== null);
        return completedTasks.filter((task) => {
            const dateMatch = selectedDate
                ? dayjs(task.completedAt).isSame(selectedDate, "day")
                : true;

            const titleMatch = title
                ? task.title.toLowerCase().includes(title.toLowerCase())
                : true;

            return dateMatch && titleMatch;
        });
    }, [tasks, selectedDate, title]);
    console.log(filteredTasks)

    const columns = [
        {
            title: 'Mitarbeiter',
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
            title: 'Fertigstellungszeit',
            dataIndex: 'completedAt',
            key: 'completedAt',
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
    ]


    return (
        <div>
            <Flex justify="center" gap={4} align="center">
                <Text fontSize="2xl" color="gray.400">
                    Datum auswählen, um erledigte Aufgaben anzuzeigen  :
                </Text>

                <DatePicker
                    size="large"
                    defaultValue={dayjs()}
                    format={dateFormat}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    disabledDate={(current) =>
                        current && (current < dayjs('2026-01-01') || current > dayjs('2050-12-31'))
                    }
                />
            </Flex>
            <Flex justify="center" my="5" gap={4} align="center">
                <Text fontSize="xl" color="#6b6f70">Aufgabes Titel eingeben, um erledigte Aufgaben anzuzeigen (ZB: 58945 4 er) : </Text>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} width="10%"></Input>
            </Flex>

            <Text fontSize="2xl" p="5">Erledigte Aufgaben</Text>
            <Table dataSource={filteredTasks
                .map(item => ({
                    ...item,
                    createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
                    withoutLabel: item.withoutLabel ? "Ohne (Herstelleretikett) Etikett " : null,
                    danger: item.danger ? <WarningTwoIcon w={8} h={8} color="red.500" /> : null,
                    employee: (users.find(user => user._id === item.responsible)).username,
                    completedAt: moment(item.completedAt).format('DD/MM/YYYY'),


                }))} columns={columns} rowKey="_id" />

        <Text color="red.400" fontSize="xl"  as="bold" >Anzahl der erledigten Aufgaben : {filteredTasks.length} </Text>

        </div>
    );
};

export default CompletedTasks;