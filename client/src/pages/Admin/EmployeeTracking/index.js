import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '../../../api';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { SyncOutlined, CheckSquareOutlined } from "@ant-design/icons";
import Task from '../../Task';
import GetTasks from '../../User/GetTasks';


const EmployeeTracking = () => {
    const { isLoading, isError, data, error } = useQuery({ queryKey: ["following-tasks"], queryFn: fetchTask, refetchOnMount: true });

    const ongoingTasks = data?.filter((task) => task.completed !== true && task.responsible !== null);

    const tabs = [
        { key: "1", label: "Ongoing", icon: SyncOutlined, component: Task },
        { key: "2", label: "Completed", icon: CheckSquareOutlined, component: GetTasks }
    ];

    return (
        <div>

            <Tabs
                defaultActiveKey="1"
                items={tabs.map((tab) => {
                    const Icon = tab.icon;
                    const Component = tab.component;

                    return {
                        key: tab.key,
                        label: tab.label,
                        icon: <Icon />,
                        children: <Component />
                    };
                })}
            />

        </div>
    );
}

export default EmployeeTracking;
