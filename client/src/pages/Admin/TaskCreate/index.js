import React from 'react';
import { FieldArray, useFormik } from "formik";
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import validationNew from './validation';
import { fetchCreateTask } from '../../../api';
import { message } from "antd";


const NewTask = () => {

    const formik = useFormik({
        initialValues: {
            title: "",
            kartonType: "",
            productquantity: "",
            boxquantity: "",
            createdAt: "",
            reponsible:"",
        },

        validationSchema: validationNew,

            onSubmit: async (values, bag) => {
            console.log(formik.values);
            message.loading({ content: "Loading...", key: "product_new" });
            try {
                await fetchCreateTask({
                    title: values.title,
                    kartonType: values.kartonType,
                    productquantity: Number(values.productquantity),
                    boxquantity: Number(values.boxquantity),
                    createdAt: values.createdAt,
                });

                message.success({ content: "Erfolgreich erstellt!", key: "task_new" });
                bag.resetForm();
            } catch (err) {
                message.error({ content: "Fehler beim Erstellen!", key: "task_new" });
            }

        }
    })

    return (
        <div>
            <Text fontSize="3xl" > Neue Aufgabe </Text>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mt="5">
                        <FormLabel>Kartonart:</FormLabel>
                        <Input name='kartonType' width="8xl" disabled={formik.isSubmitting} value={formik.values.kartonType} onChange={formik.handleChange} isInvalid={formik.touched.kartonType && formik.errors.kartonType} onBlur={formik.handleBlur} />
                        {formik.touched.kartonType && formik.errors.kartonType && <Text color="red.400">{formik.errors.kartonType}</Text>}
                    </FormControl>
                    <FormControl mt="5">
                        <FormLabel>Titel:</FormLabel>
                        <Textarea name='title' disabled={formik.isSubmitting} value={formik.values.title} width="8xl" onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.title && formik.errors.title}></Textarea>
                        {formik.touched.title && formik.errors.title && <Text color="red.400">{formik.errors.title}</Text>}
                    </FormControl>
                    <FormControl my="5">
                        <FormLabel>Produktmenge(Stück):</FormLabel>
                        <Input name='productquantity' disabled={formik.isSubmitting} type='number' width="8xl" value={formik.values.productquantity} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.productquantity && formik.errors.productquantity} />
                        {formik.touched.productquantity && formik.errors.productquantity && <Text color="red.400">{formik.errors.productquantity}</Text>}
                    </FormControl>
                    <FormControl my="5">
                        <FormLabel>	Kartonmenge:</FormLabel>
                        <Input name='boxquantity' disabled={formik.isSubmitting} type='number' width="8xl" value={formik.values.boxquantity} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.boxquantity && formik.errors.boxquantity} />
                        {formik.touched.boxquantity && formik.errors.boxquantity && <Text color="red.400">{formik.errors.boxquantity}</Text>}
                    </FormControl>
                    <FormControl my="5">
                        <FormLabel>	Erstellungszeit:</FormLabel>
                        <Input name='createdAt' disabled={formik.isSubmitting} type='date' width="8xl" value={formik.values.createdAt} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.createdAt && formik.errors.createdAt} />
                        {formik.touched.createdAt && formik.errors.createdAt && <Text color="red.400">{formik.errors.createdAt}</Text>}
                    </FormControl>

                    <Flex my="10"  justifyContent="center" >
                        <Button colorScheme='red' type="button" onClick={formik.handleReset}>Zurücksetzen</Button>
                        <Button colorScheme='green' marginLeft={15} type='submit'>Erstellen</Button>
                    </Flex>

                </form>

            </Box>
        </div>
    );
}

export default NewTask;
