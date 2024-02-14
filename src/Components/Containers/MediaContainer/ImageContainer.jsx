import React, { Fragment, useRef } from 'react'
import { useState } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';

import './style.css'

const ImageContainer = (props) => {


    // const audElm = useRef(0)

    // const [classes, setClasses] = useState({play:true, pause:false})


// const handleActions = () => {
//     setClasses({...classes, play:!classes.play, pause:!classes.pause})
// }


    return (
        <Fragment>
        <div class="image-container">
        <img src = {props.src} className ="img-fluid" style = {{width:"100%", height: "100%"}}/>
            
        </div>     
                                  
        </Fragment>
    )
}

export default ImageContainer
