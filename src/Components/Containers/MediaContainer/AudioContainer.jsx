import React, { Fragment, useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { GoUnmute, GoMute } from 'react-icons/go';

import './style.css'

const AudioContainer = (props) => {


    const audElm = useRef(0)

    const [classes, setClasses] = useState({play:props.play, pause:props.pause})
    
    const [mute, setMute] = useState(false)


const handleActions = () => {
    setClasses({...classes, play:!classes.play, pause:!classes.pause})
}

const handleMute = () => {
    if(audElm.current.muted)
    {
        audElm.current.muted =  false
    }
    else
    {
        audElm.current.muted =  true
    }
   setMute(!mute)
}


    return (
        <Fragment>
        <div class={`audio-container`+" " +props.className}>
            <div id="audio-app" onClick = {handleActions} style = {{Height:'6.3em', Width:'5.5em'}}>
                <div class={`audio-pause ${classes.pause?'active':""}`}>
                <AiFillPauseCircle size = {90} onClick = {()=>audElm.current.pause()}/>
                </div>
                <audio ref = {audElm} src={props.src} id = "audioplayer" className = "" autoPlay={props.play} loop = {props.loop}/>
                {props.children}
                <div class={`audio-play ${classes.play?'active':""}`}>
                    <AiFillPlayCircle size = {90} onClick = {()=>audElm.current.play()}/>
                </div>
            </div>
            {/* {preload()} */}
        </div>     
        <button className = "btn btn-light btnMute" onClick = {handleMute}>{mute?<GoMute/>:<GoUnmute/>}</button>               
        </Fragment>
    )
}

export default AudioContainer
