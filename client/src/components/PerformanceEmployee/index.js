import React from 'react';
import { Flex, Space, Table, Tag, col, Row } from 'antd';
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
import { color } from 'framer-motion';
import ButtonGroup from 'antd/es/button/ButtonGroup';
import { background } from '@chakra-ui/react';
dayjs.extend(isBetween);

const PerformanceEmployee = ({ tasks, user }) => {
    const { Column, ColumnGroup } = Table;

    const tasksWithLabel = tasks?.filter(task => task.withoutLabel === false);
    const tasksWithoutLabel = tasks?.filter(task => task.withoutLabel === true);

    const tasksWithLabelInterval = (interval) => tasksWithLabel?.filter((task) =>
        task.completedAt &&
        dayjs(task.completedAt).isSame(dayjs(), interval)
    )
    const tasksWithoutLabelInterval = (interval) => tasksWithoutLabel?.filter((task) =>
        task.completedAt &&
        dayjs(task.completedAt).isSame(dayjs(), interval)
    )

    const numberOfKartonsWithLabel = (interval) => tasksWithLabelInterval(interval)?.reduce(
        (sum, task) => sum + task.boxquantity, 0
    )
    const numberOfKartonsWithoutLabel = (interval) => tasksWithoutLabelInterval(interval)?.reduce(
        (sum, task) => sum + task.boxquantity, 0
    )

    const numberOfProductsWithLabel = (interval) => tasksWithLabelInterval(interval)?.reduce(
        (sum, task) => sum + task.boxquantity * task.productquantity, 0
    )
    const numberOfProductsWithoutLabel = (interval) => tasksWithoutLabelInterval(interval)?.reduce(
        (sum, task) => sum + task.boxquantity * task.productquantity, 0
    )

    const data1 = [
        {
            key: "daily",
            withoutLabel: tasksWithoutLabelInterval("day")?.length,
            withLabel: tasksWithLabelInterval("day")?.length,
            interval: "Täglich"
        },
        {
            key: "weekly",
            withoutLabel: tasksWithoutLabelInterval("week")?.length,
            withLabel: tasksWithLabelInterval("week")?.length,
            interval: "Wöchentlich"
        },
        {
            key: "monthly",
            withoutLabel: tasksWithoutLabelInterval("month")?.length,
            withLabel: tasksWithLabelInterval("month")?.length,
            interval: "Monatlich"
        },
        {
            key: "yearly",
            withoutLabel: tasksWithoutLabelInterval("year")?.length,
            withLabel: tasksWithLabelInterval("year")?.length,
            interval: "Jährlich"
        }

    ]
    const data2 = [
        {
            key: "daily",
            withoutLabel: numberOfKartonsWithoutLabel("day"),
            withLabel: numberOfKartonsWithLabel("day"),
            interval: "Täglich"
        },
        {
            key: "weekly",
            withoutLabel: numberOfKartonsWithoutLabel("week"),
            withLabel: numberOfKartonsWithLabel("week"),
            interval: "Wöchentlich"
        },
        {
            key: "monthly",
            withoutLabel: numberOfKartonsWithoutLabel("month"),
            withLabel: numberOfKartonsWithLabel("month"),
            interval: "Monatlich"
        },
        {
            key: "yearly",
            withoutLabel: numberOfKartonsWithoutLabel("year"),
            withLabel: numberOfKartonsWithLabel("year"),
            interval: "Jährlich"
        }

    ]
    const data3 = [
        {
            key: "daily",
            withoutLabel: numberOfProductsWithoutLabel("day"),
            withLabel: numberOfProductsWithLabel("day"),
            interval: "Täglich"
        },
        {
            key: "weekly",
            withoutLabel: numberOfProductsWithoutLabel("week"),
            withLabel: numberOfProductsWithLabel("week"),
            interval: "Wöchentlich"
        },
        {
            key: "monthly",
            withoutLabel: numberOfProductsWithoutLabel("month"),
            withLabel: numberOfProductsWithLabel("month"),
            interval: "Monatlich"
        },
        {
            key: "yearly",
            withoutLabel: numberOfProductsWithoutLabel("year"),
            withLabel: numberOfProductsWithLabel("year"),
            interval: "Jährlich"
        }

    ]

    return (
        <div >
            <Row>
                <col-8>
                    <Table dataSource={data1} pagination={false} bordered>
                        <ColumnGroup title="Anzahl der erledigten Aufgaben (FBA)">
                            <Column title="Zeitraum" dataIndex="interval" key="interval" />
                            <Column title="Ohne Etikett " dataIndex="withoutLabel" key="withoutLabel" />
                            <Column title="Mit Etikett" dataIndex="withLabel" key="withLabel" />
                        </ColumnGroup>
                    </Table>
                </col-8>
                <col-8>
                    <Table dataSource={data2} pagination={false} bordered >
                        <ColumnGroup title="Kartonanzahl der erledigten Aufgaben (FBA)">
                            <Column title="Zeitraum" dataIndex="interval" key="interval" />
                            <Column title="Ohne Etikett " dataIndex="withoutLabel" key="withoutLabel" />
                            <Column title="Mit Etikett" dataIndex="withLabel" key="withLabel" />
                        </ColumnGroup>
                    </Table>
                </col-8>
                <col-8>
                    <Table dataSource={data3} pagination={false} bordered  >
                        <ColumnGroup title="Anzahl der erledigten Produkte (FBA)">
                            <Column title="Zeitraum" dataIndex="interval" key="interval" />
                            <Column title="Ohne Etikett " dataIndex="withoutLabel" key="withoutLabel" />
                            <Column title="Mit Etikett" dataIndex="withLabel" key="withLabel" />
                        </ColumnGroup>
                    </Table>
                </col-8>
            </Row>



        </div>
    );
}

export default PerformanceEmployee;
