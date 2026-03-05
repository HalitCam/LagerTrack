import { DatePicker, Select, Modal } from "antd";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateUser, fetchUser } from "../../api";

const SickReportDatePicker = () => {
    const queryClient = useQueryClient();
    const { RangePicker } = DatePicker;

    const [dateRange, setDateRange] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const { data: users, isLoading } = useQuery({
        queryKey: ["users:illness"],
        queryFn: fetchUser
    });


    const addSickReportMutation = useMutation({
        mutationFn: ({ user_id, input }) => fetchUpdateUser(user_id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users:illness"] });
            setDateRange(null);
            setSelectedUserId(null);
        }
    });

    const selectedUsername = users?.find(
        user => user._id === selectedUserId
    )?.username;

    const addSickReport = () => {
        if (!dateRange || !selectedUserId) return;

        const [start, end] = dateRange;

        addSickReportMutation.mutate({
            user_id: selectedUserId,
            input: {
                $push: {
                    illnessReports: {
                        illnessStart: start,
                        illnessEnd: end
                    }
                }
            }
        });
    };

    const showConfirm = () => {
        if (!selectedUserId) return;

        Modal.confirm({
            title: "Krankmeldung bestätigen",
            content: `Notieren Sie sich die Krankmeldung von ${selectedUsername}?`,
            okText: "Ja",
            cancelText: "Abbrechen",
            onOk() {
                addSickReport();
            }
        });
    };

    return (
        <Flex justify="center" align="center">
            <Box
                border="2px dashed gray"
                p="20px"
                mr="60px"
                width="400px"
                my="40px"
                borderRadius="md"
            >
                <Text fontSize="xl" color="blue" mb="15px">
                    Die Krankmeldung des Mitarbeiters
                </Text>

                <RangePicker
                    style={{ width: "100%" }}
                    onChange={(value) => setDateRange(value)}
                    value={dateRange}
                />

                <br /><br />

                <Select
                    style={{ width: "100%" }}
                    placeholder="Mitarbeiter auswählen"
                    loading={isLoading}
                    value={selectedUserId}
                    onChange={value => setSelectedUserId(value)}
                    options={users?.map(user => ({
                        value: user._id,
                        label: user.username,
                    }))}
                />

                <Button
                    mt="20px"
                    width="100%"
                    colorScheme="pink"
                    onClick={showConfirm}
                    isDisabled={!selectedUserId || !dateRange}
                    isLoading={addSickReportMutation.isPending}
                >
                    Krankmeldung hinzufügen
                </Button>
            </Box>
        </Flex>
    );
};

export default SickReportDatePicker;