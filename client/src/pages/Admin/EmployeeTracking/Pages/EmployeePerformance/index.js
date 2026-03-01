import React from 'react';
import { fetchTask, fetchUser } from "../../../../../api";
import { useQuery } from '@tanstack/react-query';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { Grid, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import DateRangePicker from './components/dateRangePicker';
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
        queryFn: fetchTask, queryKey: ["data:user"], refetchOnMount: true,
    });

    const { data: user } = useQuery({
        queryFn: fetchUser, queryKey: ["users:performance"]
    });
    // For Amazon Performance Layout
    const completedTasks = (interval) => tasks?.filter((task) =>
        task.completedAt &&
        moment(task.completedAt).isSame(moment(), interval)
    )

    const completedTasksCount = (interval) => completedTasks(interval).length;

    const productNumber = (interval) =>
        completedTasks(interval).reduce((sum, task) => sum + task.productquantity * task.boxquantity, 0);

    const kartonNumber = (interval) =>
        completedTasks(interval).reduce((sum, task) => sum + task.boxquantity, 0);

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
                    <Row justify="center">
                        <Box marginTop="25px" >
                            <DateRangePicker backgroundColor="gray.400" size="2xl" />
                        </Box>
                    </Row>
                    <hr style={{ width: "90%", margin: "10 auto" }} />

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
                                suffix={completedTasksCount("day") <= 1 ? "FBA" : "FBA"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("week") })}
                                title="Wöchentlich"
                                value={completedTasksCount("week")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("week") <= 1 ? "FBA" : "FBA"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("month") })}
                                title="Monatlich"
                                value={completedTasksCount("month")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("month") <= 1 ? "FBA" : "FBA"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: completedTasksCount("year") })}
                                title="Jährlich"
                                value={completedTasksCount("year")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={completedTasksCount("year") <= 1 ? "FBA" : "FBA"}
                            />
                        </Flex>
                    </Row>
                    <Row justify="center">
                        <Text fontSize="large" color="gray.400">
                            Kartonanzahl der erledigten Aufgaben (FBA)</Text>
                    </Row>
                    <Row justify="center">
                        <Flex vertical gap="middle">
                            <Statistic
                                {...statisticSharedProps({ value: kartonNumber("day") })}
                                title="Täglich"
                                value={kartonNumber("day")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={kartonNumber("day") <= 1 ? "Karton" : "Kartons"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: kartonNumber("week") })}
                                title="Wöchentlich"
                                value={kartonNumber("week")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={kartonNumber("week") <= 1 ? "Karton" : "Kartons"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: kartonNumber("month") })}
                                title="Monatlich"
                                value={kartonNumber("month")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={kartonNumber("month") <= 1 ? "Karton" : "Kartons"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: kartonNumber("year") })}
                                title="Jährlich"
                                value={kartonNumber("year")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={kartonNumber("year") <= 1 ? "Karton" : "Kartons"}
                            />
                        </Flex>
                    </Row>
                    <Row justify="center">
                        <Text fontSize="large" color="gray.400">
                            Anzahl der erledigten Produkte (FBA)</Text>
                    </Row>
                    <Row justify="center">
                        <Flex vertical gap="middle">
                            <Statistic
                                {...statisticSharedProps({ value: productNumber("day") })}
                                title="Täglich"
                                value={productNumber("day")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={productNumber("day") <= 1 ? "Produkt" : "Produkte"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: productNumber("week") })}
                                title="Wöchentlich"
                                value={productNumber("week")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={productNumber("week") <= 1 ? "Produkt" : "Produkte"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: productNumber("month") })}
                                title="Monatlich"
                                value={productNumber("month")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={productNumber("month") <= 1 ? "Produkt" : "Produkte"}
                            />
                            <Statistic
                                {...statisticSharedProps({ value: productNumber("year") })}
                                title="Jährlich"
                                value={productNumber("year")}
                                styles={{
                                    title: { color: "#838689", fontWeight: 600 },
                                    content: { fontSize: "24px" },
                                }}
                                suffix={productNumber("year") <= 1 ? "Produkt" : "Produkte"}
                            />
                        </Flex>
                    </Row>
                </Col>
            </Row>

        </div>
    );
}

export default EmployeePerformance;
