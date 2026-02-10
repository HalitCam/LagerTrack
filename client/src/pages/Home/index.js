import React from 'react';
import '../../App.css';
import {Heading} from '@chakra-ui/react';

const Home = () => {
    return (
        <div className='home-container'>
            <Heading style={{ backgroundColor: 'rgb(230, 63, 63)', display:'flex', textAlign:'center',justifyContent:'center' }}>
                Schönn, dass du da bist
            </Heading>
        </div>
    );
}

export default Home;
