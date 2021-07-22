import React from 'react';
import image from '../../../assets/images/preloader.gif';


const Preloader = (props) => {
    return (
        <div>
            <img src={image} />
        </div>
    )
}

export default Preloader;