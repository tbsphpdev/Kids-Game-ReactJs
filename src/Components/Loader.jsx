import React from 'react'
import './style.css'

const Loader = (props) => {
    return (
        <div className="spinner spinner-border" role="status" style = {{color: props.color?props.color:"white"}}>
        <span className="sr-only">Loading...</span>
      </div>
    )
}

export default Loader
