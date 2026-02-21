import React, { useState, useMemo } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Flex, Text, Box, Input } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../../../../api";

const CompletedTasks = () => {
    dayjs.extend(customParseFormat);
    const dateFormat = 'DD.MM.YYYY';
    const { data, isLoading, isError, error } = useQuery({ queryKey: ["completed:tasks"], queryFn: fetchTask });

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [title, setTitle] = useState(null);

    const filteredTasks = useMemo(() => {
        if (!data) return [];
        
        const completedTasks = data.filter(task => task.completed === true);
        return completedTasks.filter((task) => {
            const dateMatch = selectedDate
                ? dayjs(task.completedAt).isSame(selectedDate, "day")
                : true;

            const titleMatch = title
                ? task.title.toLowerCase().includes(title.toLowerCase())
                : true;

            return dateMatch && titleMatch;
        });
    }, [data, selectedDate, title]);
    console.log(filteredTasks)

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
                <Text fontSize="xl" color="#6b6f70">Auggabes Titel eingeben, um erledigte Aufgaben anzuzeigen (ZB: 58945 4 er) : </Text>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} width="10%"></Input>
            </Flex>
            <Text mt={4}>{`Girilen Input: ${title} `} </Text>
            <Text mt={4}>Seçilen Tarih: {selectedDate?.format(dateFormat)}</Text>

        </div>
    );
};

export default CompletedTasks;