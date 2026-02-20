import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const Error404 = () => {
    return (
        <div>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>EROR404!</AlertTitle>
                <AlertDescription>Diese Webseite wurde leider nicht gefunden..</AlertDescription>
            </Alert>
        </div>
    );
}

export default Error404;
