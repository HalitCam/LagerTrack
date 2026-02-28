import React from 'react';
import { fetchTask, fetchUser } from "../../../../../api";
import { useQuery } from '@tanstack/react-query';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { Grid, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import DateRangePickerValue from './components/dateRangePicker';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
} from '@chakra-ui/react'

// For Amazon Performance Layout
import { ArrowUpOutlined } from '@ant-design/icons';
import { createStaticStyles } from 'antd-style';
// Static styles for Statistic wrapper
const classNames = createStaticStyles(({ css }) => ({
    root: css`
        border: 3px dashed #ccc;
        padding: 16px;
        border-radius: 8px;
        margin: 10px 10px;
    `,
}));

// Shared props for Statistic
const statisticSharedProps = ({ value }) => {
    return {
        classNames: { root: classNames.root },
        prefix: Number(value) > 0 ? <ArrowUpOutlined style={{ color: "green" }} /> : null,
    };
};

const EmployeePerformance = () => {
    const { data: tasks, isLoading, isError, error } = useQuery({
        queryFn: fetchTask, queryKey: ["data:user"]
    });

    const { data: user } = useQuery({
        queryFn: fetchUser, queryKey: ["users:performance"]
    });

    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="100vh" >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Flex >
        )
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }
    // For Amazon Performance Layout

    const completedTasksCount = (interval) => tasks?.filter((task) =>
        task.completedAt &&
        moment(task.completedAt).isSame(moment(), interval)
    ).length;

    return (
        <div >
            <Row justify="center" style={{ margin: "10px 0", marginBottom: "50px" }}>
                <Col>
                    <Text fontSize="2xl" fontWeight="bold" boxShadow="lg">
                        Performance
                    </Text>
                </Col>
            </Row>
            <Row  >
                <Col span={10}>
                    <TableContainer>
                        <Table border="2px dashed "
                            borderColor="gray.500"
                            borderRadius="md"
                            marginTop="10px">
                            <TableCaption>Klicken Sie auf die Namen, um detaillierte Leistungsdaten der Mitarbeiter anzuzeigen.</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Die Mitarbeiter</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user?.map((data) => (<Tr key={data._id}><Td>
                                    <Link to={`/performance/${data._id}`}>{data.username}</Link></Td></Tr>))}
                            </Tbody>

                        </Table>
                    </TableContainer>

                </Col>

                <Col span={14}>
                    <Row justify="center" style={{ marginBottom: "15px" }} >
                        <Text fontSize="2xl" color="blue.600">
                            Gesamtleistung des Amazon-Lagers
                        </Text>
                    </Row>
                    <Row justify="center">
                        <Text fontSize="large" color="gray.400">Anzahl der  erledigten Aufgaben (FBA)</Text>
                    </Row>
                    <Row justify="center">
                        <Flex vertical gap="middle">
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("day") })}
                                title="Täglich"
                                value={completedTasksCount("day")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("day") <= 1 ? "Aufgabe" : "Aufgaben"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("week") })}
                                title="Wöchentlich"
                                value={completedTasksCount("week")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("week") <= 1 ? "Aufgabe" : "Aufgaben"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("month") })}
                                title="Monatlich"
                                value={completedTasksCount("month")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("month") <= 1 ? "Aufgabe" : "Aufgaben"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("year") })}
                                title="Jährlich"
                                value={completedTasksCount("year")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("year") <= 1 ? "Aufgabe" : "Aufgaben"}
                            />
                        </Flex>
                    </Row>
                    <Row justify="center">
                        <Box marginTop="25px" >
                            <DateRangePickerValue backgroundColor="gray.400" size="2xl" />
                        </Box>
                    </Row>
                </Col>
            </Row>

        </div>
    );
}

export default EmployeePerformance;
