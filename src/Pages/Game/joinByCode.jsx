import React, { useEffect, useState, Fragment } from 'react';
import './style.css';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';


import Logo from '../../assets/img/logo.svg'
import profile from '../../assets/img/profileImage.png'


import classNames from 'classnames'
import { Collapse } from 'react-bootstrap';
import { joinByGameCode } from './helper';
import { ErrToast, setCookie } from '../../Helper/Util';
import { useTranslation } from 'react-i18next';


export default function JoinByCode(props) {

  const [t] = useTranslation()

  const [values, setValues] = useState({
      gameCode:props.match.params.gameCode,
      username:""
  }); 

  
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  const [show, setShow] = useState(false)
  const [nav, setNav] = useState({isOpen:false})
  const [profileDropdaown, setProfileDropdown] = useState(false)

 

  const history = useHistory();

  useEffect(() => {
    document.body.classList.add('authentication-page');
    return function cleanup() {
      document.body.classList.remove('authentication-page');
    };
  }, []);

  const handleChange = (e) => {
      setValues({...values, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {

    if(!values.gameCode)
    {
     return ErrToast(t('messages.error.requiredGameCode'), 2000)
    }
    else if(!values.username)
    {
      return ErrToast(t('messages.error.requiredName'), 2000)
    }

    joinByGameCode(values).then(
      res => {
        // return console.log("Response:" ,res.error)
        if(res.error)
        {
          ErrToast(res.error, 2000)
        }
        else if(res&&res.data.result)
        {
          setCookie('player', {id:res.data.result.memberId, userName: res.data.result.username}, 24)
          history.push(`/quest/${res.data.result.gameId}/lobby/2`)
        }
        else {
          console.log("2",res)
          ErrToast(res, 2000);
        }
      }
    ).catch(err => {
      // console.log(err.response)
       return ErrToast(err.response.data.error, 2000)
    }) 
  }








  window.addEventListener("resize", function(){
      setScreenWidth( window.innerWidth)
    });

  var navClass = classNames({
      "navbar-collapse": true,
      'show': nav.isOpen,
      'collapse':  true,
      toggler:nav.isOpen?"": "collapsed"
    });
  var toggler = classNames({
    "collapsed":nav.isOpen?"":"collapsed"
    });



  const Header = () => {
    return (
      <nav className="navbar navbar-expand-lg bg-theme-darkBlue py-4">
      <img src = {Logo} alt = "logo" className="img-fluid logo"/>
      
      <button className={`navbar-toggler ${toggler}`} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon text-white" onClick = {() => {setNav({isOpen:!nav.isOpen})}}><GiHamburgerMenu/></span>
      </button>
      <div className={navClass} id="navbarText">
          {/* <ul className="navbar-nav ml-auto"> */}
          
        
              {/* <li className="nav-item" onClick = {() =>{setNav({isOpen:false})}}>
              <button className= {`btn-hlpctr mr-2  gradBorder font-roboto-regular  font11 text-white bg-theme-lightGrey text-uppercase ${screenWidth<1000?"w-100 text-left":""}` }>{t('component.label.helpCenter')} </button>
              </li> */}
              {/* <li className="nav-item" onClick = {() =>{setProfileDropdown(!profileDropdaown)}}>
              <img src = {profile} alt = "Profile" className={`img-fluid ${screenWidth<1000?"py-3":""}`}/>
              <Collapse className = "menu-profile" in = {profileDropdaown}  style = {{}}>
                          <div id="collapse-text1">
                          <ul className = "list-group ">
                               <li className = "list-group-item">{t('component.label.profile')} </li>
                              <li className = "list-group-item" onClick = {() => {localStorage.clear(); history.push('/')}}>{t('component.label.logout')} </li>
                             </ul>
                          </div>
                      </Collapse>
              </li>
              
          </ul> */}
      </div>
  </nav>
    )
  }


  return (
  <Fragment>
    <ToastContainer/>
    {Header()}
    <div className ="h-100 jBC_Cont">
        <div className='joinByCode-bgimage h-100'>
      <div className='container-fluid h-100'>
        <div className='row h-100 justify-content-center'>
          <div className='col-lg-4 col-md-8 col-11 align-self-center'>
            <div className='bg-join p-4'>
              <div className='form-heading'>
                <h3 className='text-center font-roboto-regular-bold mb-4 text-white'>{t('form.label.welcome')} !</h3>
              </div>
              <div className='form-message'>
                  <p className='text-center font-roboto-regular mb-4 text-white px-3'>
                     {t('messages.desc.joiningMsg')}
                        </p>
              </div>

       
              <form>
              <div class="form-group">
              <input 
                    value={values.gameCode} 
                    onChange={handleChange}
                    name = "gameCode" 
                    type='text' 
                    size='lg' 
                    placeholder={t('form.placeholder.gameCode')} 
                    className='form-control font-roboto-medium' />
              </div>
              <div class="form-group">
              <input   
                    value={values.username}
                    onChange={handleChange}
                    name = "username"
                    type="text"
                    size='lg'
                    placeholder={t('form.placeholder.name')}
                    className=' form-control font-roboto-medium'/>
              </div>
              </form>

          

           

             <div className = "w-100 text-center">
             <button onClick={handleSubmit} className='btn btn-rqstJoin text-white border-0 font-roboto-bold font14 my-3 py-2'>
              {t('form.label.joinRequest')}
              </button>
             </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  </Fragment>
  );
}
