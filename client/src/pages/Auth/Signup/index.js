import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import validationSchema from './validations';
import { Heading, Flex, Box, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';

const Signup = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: validationSchema,

        onSubmit: async (values, bag) => {
            try {
                const registerResponse = await fetchRegister({
                    username: values.username,
                    password: values.password
                })
                login(registerResponse)
                navigate('/profile')
            } catch (e) {
                bag.setErrors({ general: e.response.data.message })
            }
        }
    })

    return (
        <div>
            <Flex justifyContent="center" width="full" align='center' >
                <Box pt={10}>
                    <Box textAlign="center">
                        <Heading color='gray.500'>Benutzerkonto erstellen</Heading>
                    </Box>
                    <Box my={5}>
                        {
                            formik.errors.general && (
                                <Alert status="error">
                                    {formik.errors.general}
                                </Alert>
                            )
                        }
                    </Box>
                    <Box my={5} mt={10} textAlign="left">
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <FormControl>
                                <FormLabel>Benutzername:</FormLabel>
                                <Input
                                    name='username'
                                    type='text'
                                    placeholder='Username'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    isInvalid={formik.touched.username && formik.errors.username}

                                />
                                {formik.touched.username && formik.errors.username && (
                                    <Alert status="error">{formik.errors.username}</Alert>
                                )}
                            </FormControl >
                            <FormControl mt="4">
                                <FormLabel>Kennwort:</FormLabel>
                                <Input
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <Alert status="error">{formik.errors.password}</Alert>
                                )}
                            </FormControl>
                            <FormControl mt="4">
                                <FormLabel>Kennwort bestätigen:</FormLabel>
                                <Flex >
                                    <Input
                                        name='passwordConfirm'
                                        type={showPassword ? "text" : "password"}
                                         placeholder='Password again'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.passwordConfirm}
                                        isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}

                                    />
                                    <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </Flex>
                                {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                                    <Alert status="error">{formik.errors.passwordConfirm}</Alert>
                                )}
                            </FormControl>
                            <Button bg="gray.300" type='submit' mt='4' width='full'>Jetzt Registrieren</Button>
                        </form>
                    </Box>
                </Box>

            </Flex>
        </div>
    );
}

export default Signup;

