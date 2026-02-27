import React from 'react';
import "../../image-gallery.css";
import ImageGallery from "react-image-gallery";
import lager from '../../image/lager.jpeg';
import lagericon from '../../image/lagericon.png';
import DHLicon from '../../image/DHLicon.png'
import { Box, Text, Avatar, Wrap, WrapItem, Link } from '@chakra-ui/react';
import WebAppDeveloper from '../../image/WebAppDeveloper.jpeg';

// Avatar libraries

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
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            flex:"1", overflow:"hidden", maxH:"20vh"
        }} >
            <Text boxShadow='xs' bg='gray.50' color='#484242' fontSize='2xl' display='flex' itemsAlign="center" justifyContent="center" >Schön, dass du da bist..</Text>

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
            <Box>
                <Wrap justify="center"
                    align="center"
                    py={4}
                    borderTop="2px solid"
                    borderColor="gray.300">
                    <WrapItem>
                        <Avatar name='Halit ' src={WebAppDeveloper} />
                    </WrapItem>
                    <Text color="gray.400">
                        © 2026{" "} developed by {" "}
                        <Link
                            href="mailto:halitcam.mail@gmail.com"
                            color="blue.400"
                            _hover={{ textDecoration: "underline", color: "blue.500" }}
                        >
                            Halit Cam
                        </Link>
                    </Text>

                </Wrap>

            </Box>
        </div>
    );
}

export default Home;

