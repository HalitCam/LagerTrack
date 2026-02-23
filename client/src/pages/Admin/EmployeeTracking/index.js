import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '../../../api';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { SyncOutlined, CheckSquareOutlined, ThunderboltOutlined  } from "@ant-design/icons";
import OngoingTasks from "./Pages/OngoingTasks";
import CompletedTasks from "./Pages/CompletedTasks";
import  EmployeePerformance from "./Pages/EmployeePerformance";



const EmployeeTracking = () => {
   
    const tabs = [
        { key: "1", label: "Laufende Aufgaben", icon: SyncOutlined, component: OngoingTasks },
        { key: "2", label: "Erledigte Aufgaben", icon: CheckSquareOutlined, component: CompletedTasks },
        { key:"3", label: "Mitarbeiterleistung", icon: ThunderboltOutlined , component: EmployeePerformance }

    ];
    
    return (
        <div>

            <Tabs size="large"
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
