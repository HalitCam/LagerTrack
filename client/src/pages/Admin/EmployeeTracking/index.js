import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '../../../api';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { SyncOutlined, CheckSquareOutlined } from "@ant-design/icons";
import OngoingTasks from "./Pages/OngoingTasks";
import CompletedTasks from "./Pages/CompletedTasks";


const EmployeeTracking = () => {
    const { isLoading, isError, data, error } = useQuery({ queryKey: ["following-tasks"], queryFn: fetchTask, refetchOnMount: true });

    const ongoingTasks = data?.filter((task) => task.completed !== true && task.responsible !== null);

    const tabs = [
        { key: "1", label: "Laufende Aufgaben", icon: SyncOutlined, component: OngoingTasks },
        { key: "2", label: "Erledigte Aufgaben", icon: CheckSquareOutlined, component: CompletedTasks }
    ];

    return (
        <div>

            <Tabs size='large'
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
