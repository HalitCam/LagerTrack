import React, { useState } from 'react';
import { DatePicker, Space, Statistic } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from '../../../../../../api';
import { Text } from "@chakra-ui/react";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const DateRangePicker = ({data}) => {

    const [filteredTasks, setFilteredTasks] = useState([]);

    const onRangeChange = (dates) => {
        if (!dates) {
            setFilteredTasks([]);
            return;
        }

        const [start, end] = dates;

        const filtered = data?.filter(task => task.completed &&
            dayjs(task.completedAt).isBetween(start, end, "day", "[]")
        );

        setFilteredTasks(filtered);
    };

    return (
        <div>
            <Space direction="vertical" size={12} >
                <Text fontSize="large" color="gray.400">(FBA) Erledigte Aufgabenanzahl im Zeitraum</Text>
                <RangePicker onChange={onRangeChange} />
                <Text color="gray.500">Aufgabenanzahl im Zeitraum (FBA)</Text>
                <Statistic style={{
                    border: "2px dashed #1890ff",
                    padding: "12px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center"

                }}
                    title={filteredTasks.length === 0 ? "Aufgabenanzahl im Zeitraum" : null} 
                    value={filteredTasks.length ?? 0}
                    formatter={(value) => (value === 0 ? "" : value)}
                />
            </Space>

        </div>
    );
};

export default DateRangePicker;