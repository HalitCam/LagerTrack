import React from 'react';
import dayjs from "dayjs";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const IllnessReportsDisplay = ({user}) => {;

    console.log(user)
    return (
        <div>
            <TableContainer width="700px" maxHeight="200px" overflowY="auto">
                <Table variant="striped" colorScheme='gray'>
                    <TableCaption>Die erhaltenen Krankmeldungen ({user?.username})</TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Startdatum</Th>
                            <Th>Enddatum</Th>
                            <Th isNumeric>Kranktage</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {user.illnessReports.map(report => (
                            <Tr>
                                <Td>{dayjs(report.illnessStart).format("DD-MM-YYYY")}</Td>
                                <Td>{dayjs(report.illnessEnd).format("DD-MM-YYYY")}</Td>
                                <Td isNumeric>{dayjs(report.illnessEnd).diff(dayjs(report.illnessStart), "day")+1}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Gesamtkranktage :</Th>
                            <Th></Th>
                            <Th isNumeric>{user.illnessReports.reduce((acc,report) => (acc+dayjs(report.illnessEnd).diff(dayjs(report.illnessStart), "day")+1), 0) }</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
}

export default IllnessReportsDisplay;
