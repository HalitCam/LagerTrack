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
import { fetchUser, fetchUpdateUser, fetchDeleteUser, fetchDeleteTask, fetchTask } from '../../api';
import { useAuth } from '../../contexts/AuthContext';

const { confirm } = Modal;

const ChangeUserRole = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks:control"],
    queryFn: fetchTask,
  });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users:role"],
    queryFn: fetchUser
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id }) => fetchDeleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user:delete"] });

      toast({
        title: "Mitarbeiter erfolgreich gelöscht!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setDeleteUserId(null);
    },
    onError: () => {
      toast({
        title: "Fehler beim Löschen des/des Mitarbeiters (-in)",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    }
  });

  const userRoleMutation = useMutation({
    mutationFn: ({ id, input }) => fetchUpdateUser(id, input),
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
  const deleteTasksOfDeletedUser = useMutation({
    mutationFn: ({ id }) => fetchDeleteTask(id),
    onSuccess: queryClient.invalidateQueries(["task:deletedUser"])
  })


  const selectedUser = users.find(user => user._id === selectedUserId);
  const selectedDeleteUser = users.find(user => user._id === deleteUserId);

  const willDeleteTaks = tasks?.filter(task => task.responsible && task.responsible === selectedDeleteUser?._id)

  const showConfirm = () => {
    if (!selectedUser) return;

    confirm({
      title: 'Benutzerrolle ändern?',
      content: `Möchten Sie ${selectedUser.username} wirklich ${selectedUser.role === "admin"
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

  const showConfirmDelete = () => {
    if (!selectedDeleteUser) return;

    confirm({
      title: 'Benutzerkonto löschen?',
      content: `Möchten Sie ${selectedDeleteUser.username} wirklich löschen?`,
      okText: 'Ja',
      cancelText: 'Abbrechen',
      onOk() {
        deleteUser();
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

  const deleteUser = () => {
    deleteMutation.mutate(
      { id: selectedDeleteUser._id },
      {
        onSuccess: () => {
          willDeleteTaks.forEach(task => {
            deleteTasksOfDeletedUser.mutate({ id: task._id });
          });
        }
      }
    );
  };


  return (
    <Flex justify="right" align="center" mr="50px" >
      <Flex justify="center" align="center" mr="50">
        <Box
          border="2px dashed gray"
          p="20px"
          mr="15px"
          width="400px"
          my="40px"
          borderRadius="md"
        >

          <Text fontSize="2xl" color="gray.600" mb="15px">
            Benutzerrolle ändern ?
          </Text>

          <Select
            style={{ width: "100%" }}
            placeholder="Mitarbeiter auswählen"
            loading={isLoading}
            onChange={(value) => setSelectedUserId(value)}
            value={selectedUserId}
            options={users.filter(item => item.username !== user.username).map(person => ({
              value: person._id,
              label: person.username,
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
      </Flex>
      <Flex justify="center" align="center">
        <Box
          border="2px dashed gray"
          p="20px"
          mr="15px"
          width="400px"
          my="40px"
          borderRadius="md"
        >

          <Text fontSize="2xl" color="red.600" mb="15px">
            Mitararbeiterkonto löschen ?
          </Text>

          <Select
            style={{ width: "100%" }}
            placeholder="Mitarbeiter auswählen"
            loading={isLoading}
            onChange={(value) => setDeleteUserId(value)}
            value={deleteUserId}
            options={users.filter(item => item.username !== user.username).map(person => ({
              value: person._id,
              label: person.username,
            }))}
          />

          <Button
            mt="20px"
            width="100%"
            colorScheme="red"
            onClick={showConfirmDelete}
            isDisabled={!selectedDeleteUser}
            isLoading={deleteMutation.isPending}
          >
            Löschen
          </Button>

        </Box>
      </Flex>


    </Flex>
  );
};

export default ChangeUserRole;