import React , {useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Flex, Box, Input, FormLabel, Heading, Alert, FormControl } from '@chakra-ui/react';
import { useFormik } from 'formik';
import SigninValidation from './validations';
import { fetchLogin } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: SigninValidation,
        onSubmit: async (values, bag) => {
            try {
                const loginResponse = await fetchLogin({
                    username: values.username,
                    password: values.password
                })
                login(loginResponse);
                navigate("/profile");

            } catch (e) {
                bag.setErrors({ general: e.response.data.message });
            }
        }
    })

    return (
        <Flex justifyContent="center" textAlign="center" width="full">
            <Box pt={10}>
                <Heading color='gray.500'> Anmelden </Heading>
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
                        <FormControl mb={4}>
                            <FormLabel htmlFor='username' > Benutzername: </FormLabel>
                            <Input
                                id='username'
                                type="text"
                                placeholder='Username'
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>

                        {formik.touched.username && formik.errors.username && (
                            <Alert status="error">{formik.errors.username}</Alert>
                        )}

                        <FormControl mb={4}>
                            <FormLabel htmlFor='password' > Kennwort: </FormLabel>
                            <Flex>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='new-password'
                                />
                                <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </Flex>
                        </FormControl>

                        {formik.touched.password && formik.errors.password && (
                            <Alert status="error">{formik.errors.password}</Alert>
                        )}

                        <Button width="100%" mt="5px" type='submit' isLoading={formik.isSubmitting}>Einloggen</Button>
                    </form>
                </Box>

            </Box>
        </Flex>
    );

}

export default Signin;

