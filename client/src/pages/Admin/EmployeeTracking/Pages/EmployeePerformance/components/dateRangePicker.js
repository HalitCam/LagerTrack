import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from '../../../../../../api';
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
    const { isError, isLoading, error, data } = useQuery({
        queryKey: ["datePicker:tasks"],
        queryFn: fetchTask
    });

    const [filteredTasks, setFilteredTasks] = useState([]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    // Tek tarih filtreleme
    const onChange = (date) => {
        if (!date) {
            setFilteredTasks([]);
            return;
        }

        const filtered = data?.filter(task =>
            dayjs(task.completedAt).isSame(date, "day")
        );

        setFilteredTasks(filtered);
    };

    // Tarih aralığı filtreleme
    const onRangeChange = (dates) => {
        if (!dates) {
            setFilteredTasks([]);
            return;
        }

        const [start, end] = dates;

        const filtered = data?.filter(task =>
            dayjs(task.completedAt).isBetween(start, end, "day", "[]")
        );

        setFilteredTasks(filtered);
    };

    return (
        <div>
            <Space direction="vertical" size={12}>
                <DatePicker onChange={onChange} />
                <RangePicker onChange={onRangeChange} />
            </Space>

            <div style={{ marginTop: 20 }}>
                <strong>Filtered Tasks:</strong>
                <p>{filteredTasks.length} task found</p>
            </div>
        </div>
    );
};

export default DateRangePicker;