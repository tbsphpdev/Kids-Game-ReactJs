import React from 'react'
import { MdClose, MdModeEdit } from 'react-icons/md'
import Media from 'react-bootstrap/Media';
import { BsFillEyeFill } from 'react-icons/bs';
import ProfileImg from '../../assets/img/profileImage.png'
import { Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import HeaderAvatarMenu from '../HeaderAvatarMenu';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrToast, SuccessToast } from '../../Helper/Util';
import { ToastContainer } from 'react-toastify';

const HeaderCreate = ({setShow,show, title, userName, ...props}) => {

  const [t] = useTranslation()

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [screenWidth, setScreenWidth] = useState(window.screen.width)

  const history = useHistory()

  window.addEventListener("resize", function(){
    setScreenWidth( window.innerWidth)
  });


  const handleSaveDraft = async() => {
    setTimeout(() => {
      history.push("/");
    }, 1000);
    SuccessToast(t('messages.success.saveSuccess'),2000)
  }



    return (
        <div className="wrapper-header fixed-top headerZindex" >
          <ToastContainer/>
          <div className="row justify-content-center m-0">
              {/* <div className="col-lg-4 col-md-6 col-12 text-left align-self-center">
                <Media className="wrapper-profile  p-2">
               
                  
                  <img
                    className="mr-2"
                    src={ProfileImg}
                    alt="Profile Picture"
                  />
                  <Media.Body className="wrapper-profile align-self-center">
                      <h6 className="font-roboto-bold font13 text-white mb-1">{title?title:""}</h6>
                      <p className="text-theme-grey font-roboto-bold font13 mb-0">{userName? userName:""}
                       
                      </p>
                     
                  </Media.Body>
                  {
                    screenWidth>768?"":<GiHamburgerMenu className ="text-white mt-3" size ={20} onClick = {() => {setIsCollapsed(!isCollapsed)} }/>
                  }
                  
                </Media>
              </div> */}
              {/* <div className="col-lg-4 col-md-2 col-12 text-center align-self-center">
                    <p className="text-theme-grey font-roboto-Medium font14 mb-0">
                       
                    </p>
              </div> */}
              {
                screenWidth>768?
                (
                  // <div className="col-lg-4 col-md-4 col-12 align-self-center text-left">
                  <div className="wrapper-button d-inline-block p-4 d-flex flex-content-center justify-content-between">
                      {/* <button className="editButton mr-2 text-bgcolor-darkgrey">
                      <MdModeEdit/>
                      </button> */}
                   
                     <div className ="p-0">
                     <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {() =>{setShow({...show, modalDetails:true})}}>
                      {t('component.label.settings')}
                          </button>
                     </div>
                     <div className ="p-0">
                     <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {handleSaveDraft}>
                      {t('component.label.save')+" "+ t('component.label.draft')}
                          </button>
                      <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {() => {setShow({...show, modalShare:true})}}>
                      {t('component.label.share')}
                          </button>
                     </div>
                      
                     
                  </div>
              // </div>
                )
                :
                  <Collapse in={!isCollapsed}>
              {/* <div className="col-lg-4 col-md-4 col-12 align-self-center text-right"> */}
                  <div className="wrapper-button d-inline-block p-4 d-flex flex-content-center justify-content-between">
                  <div className ="p-0">
                     <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {() =>{setShow({...show, modalDetails:true})}}>
                      {t('component.label.settings')}
                          </button>
                     </div>
                     <div className ="p-0">
                     <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {handleSaveDraft}>
                      {t('component.label.save')+" "+ t('component.label.draft')}
                          </button>
                      <button className="editButton mr-2 text-bgcolor-darkgrey" style = {{width: 'auto', padding: "0 1em"}} onClick = {() => {setShow({...show, modalShare:true})}}>
                      {t('component.label.share')}
                          </button>
                     </div>
                      {/* <button className = "closeButton">
                      <MdClose/>
                      </button> */}
                  </div>
              {/* </div> */}
              </Collapse>
                
              }
          </div>
        </div>
     
    )
}

export default HeaderCreate
