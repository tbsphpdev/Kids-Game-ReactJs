import React, { Fragment, useRef } from 'react'
import { useState } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';

import './style.css'

const VideoContainer = (props) => {


    const audElm = useRef(0)

    const [classes, setClasses] = useState({play:true, pause:false})


const handleActions = () => {
    setClasses({...classes, play:!classes.play, pause:!classes.pause})
}


    return (
        <Fragment>
        <div class="video-container">
        <video  ref = {audElm} width = "100%" height= "100%" style ={{objectFit: props.fullsize?"fill":"contain"}} controls = {props.controls}> 
        {/* //position:"absolute",  */}
                <source   src={props.src} type="video/mp4"/>
                </video>
            {/* <div id="video-app" onClick = {handleActions} style = {{Height:'6.3em', Width:'5.5em'}}>
                <div class={`video-pause ${classes.pause?'active':""}`}>
                <AiFillPauseCircle size = {90} onClick = {()=>audElm.current.pause()}/>
                </div>
               
                
                {props.children}
                <div class={`video-play ${classes.play?'active':""}`}>
                    <AiFillPlayCircle size = {90} onClick = {()=>audElm.current.play()}/>
                </div>
            </div> */}
            
        </div>     
                                  
        </Fragment>
    )
}

export default VideoContainer
