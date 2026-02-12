import React from 'react';
import "../../image-gallery.css";
import ImageGallery from "react-image-gallery";
import lager from '../../image/lager.jpeg';
import lagericon from '../../image/lagericon.png';
import DHLicon from '../../image/DHLicon.png'
import {Box, Text} from '@chakra-ui/react';

const Home = () => {
    const images = [
        {
            original: lagericon,
        },
        {
            original: lager,
            
        },
        {
            original: DHLicon,
        }

    ];
    return (
        <div>
            <Text boxShadow='xs'    bg='gray.50' color='#484242' fontSize='2xl' display='flex' itemsAlign="center" justifyContent="center" >Schön, dass du da bist..</Text>

            <Box>
                <ImageGallery
                slideDuration={3000}
                slideInterval={1200}
                autoPlay={true}
                items={images}
                showPlayButton={false}
                showNav={false}
                showFullscreenButton={false}
                showThumbnails={false}
            />
            </Box>            
        </div>
    );
}

export default Home;


// <div className='home-container'>

// </div>