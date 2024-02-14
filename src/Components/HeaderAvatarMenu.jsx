import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import profile from '../assets/img/profileImage.png'

const HeaderAvatarMenu = (props) => {
    const history = useHistory()

    const [profileDropdaown, setProfileDropdown] = useState(false)

    return (<div className = "">
        <div onClick = {() => {setProfileDropdown(!profileDropdaown)}} id = "av_menu_container">
             <img src = {profile} alt = "Profile" className={`img-fluid ${props.screenWidth<1000?"py-3":"pr-2"}`}/>
                        <Collapse className = "menu-right" in = {profileDropdaown}  style = {{}}>
                                    <div id="collapse-text1" >
                                    <ul className = "list-group ">
                                         <li className = "list-group-item">Profile </li>
                                        <li className = "list-group-item" onClick = {() => {localStorage.clear(); history.push('/')}}>LogOut</li>
                                       </ul>
                                    </div>
                                </Collapse>
        </div>
        <div onClick = {() => {setProfileDropdown(!profileDropdaown)}} style = {{background:"red"}} id = "av_menu_container2">
             <div>
                 
             </div>
                       <div>
                       <Collapse className = "menu-left" in = {profileDropdaown}  style = {{}}>
                                    <div id="collapse-text1" >
                                    <ul className = "list-group ">
                                         <li className = "list-group-item">Profile </li>
                                        <li className = "list-group-item" onClick = {() => {localStorage.clear(); history.push('/')}}>LogOut</li>
                                       </ul>
                                    </div>
                                </Collapse>
                       </div>
        </div>
        </div>
    )
}

export default HeaderAvatarMenu
