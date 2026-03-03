import React, { useState } from 'react';
import {
  Button,
  Text,
  Flex,
  Box,
  useToast,
  Badge
} from '@chakra-ui/react';
import { Select, Alert, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, fetchUpdateUser } from '../../api';

const { confirm } = Modal;

const ChangeUserRole = () => {

  const queryClient = useQueryClient();
  const toast = useToast();

  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users:role"],
    queryFn: fetchUser
  });

  const userRoleMutation = useMutation({
    mutationFn: ({id, input}) => fetchUpdateUser(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users:role"] });

      toast({
        title: "Rolle erfolgreich geändert",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedUserId(null);
    },
    onError: () => {
      toast({
        title: "Fehler beim Ändern der Rolle",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  const selectedUser = users.find(user => user._id === selectedUserId);

  const showConfirm = () => {
    if (!selectedUser) return;

    confirm({
      title: 'Benutzerrolle ändern?',
      content: `Möchten Sie ${selectedUser.username} wirklich ${
        selectedUser.role === "admin"
          ? "zum User machen"
          : "zum Admin machen"
      }?`,
      okText: 'Ja',
      cancelText: 'Abbrechen',
      onOk() {
        changeRole();
      },
    });
  };


  const changeRole = () => {
    
    userRoleMutation.mutate({
      id: selectedUser._id,
      input: {
        role: selectedUser.role === "admin" ? "user" : "admin"
      }
    });
  };

  return (
    <Box
      border="2px dashed gray"
      p="20px"
      ml="auto"
      width="400px"
      my="40px"
      borderRadius="md"
    >

      <Text fontSize="2xl" color="gray.600" mb="15px">
        Benutzerrolle ändern
      </Text>

      <Select
        style={{ width: "100%" }}
        placeholder="Mitarbeiter auswählen"
        loading={isLoading}
        onChange={(value) => setSelectedUserId(value)}
        value={selectedUserId}
        options={users.map(user => ({
          value: user._id,
          label: user.username,
        }))}
      />

      {selectedUser && (
        <Box mt="20px">
          <Alert
            message={
              <Flex align="center" gap="10px">
                Aktuelle Rolle:
                <Badge
                  colorScheme={
                    selectedUser.role === "admin"
                      ? "red"
                      : "green"
                  }
                >
                  {selectedUser.role.toUpperCase()}
                </Badge>
              </Flex>
            }
            type="info"
          />
        </Box>
      )}

      <Button
        mt="20px"
        width="100%"
        colorScheme={selectedUser?.role === "admin" ? "red" : "blue"}
        onClick={showConfirm}
        isDisabled={!selectedUser}
        isLoading={userRoleMutation.isPending}
      >
        {selectedUser?.role === "admin"
          ? "Zum User machen"
          : "Zum Admin machen"}
      </Button>

    </Box>
  );
};

export default ChangeUserRole;