import React from 'react';
import "../../image-gallery.css";
import ImageGallery from "react-image-gallery";
import lager from '../../image/lager.jpeg';
import lagericon from '../../image/lagericon.png';
import DHLicon from '../../image/DHLicon.png'



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
            <ImageGallery
                slideDuration={4750}
                slideInterval={1550}
                autoPlay={true}
                items={images}
                showPlayButton={false}
                showNav={false}
                showFullscreenButton={false}
                showThumbnails={false}
                
            />
            
        </div>
    );
}

export default Home;


// <div className='home-container'>

// </div>