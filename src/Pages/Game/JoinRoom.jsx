import React, { Fragment, useEffect } from 'react'; 

import { Card } from 'react-bootstrap'; 

import '../../App.css'; 

import Logo from '../../assets/img/logo.svg' 

import { Button } from 'react-bootstrap'; 

import MuseumOfAthens from '../../assets/img/room2.png'; 

import eiffleTower from '../../assets/img/room4.png'; 

import {AiFillPlayCircle} from 'react-icons/ai/index'; 

import { GiHamburgerMenu } from 'react-icons/gi'; 

import profile from '../../assets/img/profileImage.png' 

import classNames from 'classnames' 

import { Collapse } from 'react-bootstrap'; 

import { useHistory } from 'react-router-dom'; 

import { useState } from 'react'; 

import { RiArrowDropDownLine } from 'react-icons/ri'; 

import { ErrToast, getDisplayFormatDate, getPlayer, getTimeDifference, isAuthenticated, setCookie, SuccessToast } from '../../Helper/Util'; 

import { MdAccountCircle } from 'react-icons/md'; 

import { BiLogOutCircle } from 'react-icons/bi'; 

import { closeGame, getLobbyDetails, startGame } from './helper'; 

import AudioContainer from '../../Components/Containers/MediaContainer/AudioContainer'; 

import { getGameStatus } from '../PlayGround/helper'; 

import { ToastContainer } from 'react-toastify'; 

import { useTranslation } from 'react-i18next'; 

import VideoContainer from '../../Components/Containers/MediaContainer/VideoContainer'; 
import ModalContainer from '../../Components/ModalContainer';
// import {  AiFillPlayCircle } from 'react-icons/ai';

const JoinRoom = (props) =>{ 

    const [t] = useTranslation(); 

    const history = useHistory() 

 
 

    const [nav, setNav] = useState({isOpen:false}) 

    const [profileDropdaown, setProfileDropdown] = useState(false) 

    const [screenWidth, setScreenWidth] = useState(window.screen.width) 

    const [listCollapsed, setListCollapsed] = useState(true) 

    const [lobbyDetails, setLobbyDetails] = useState("") 

    const [strtBtn, setStrtBtn] = useState(true);    

    const [timer, setTimer] = useState("") 

    const [gameStatus, setGameStatus] = useState(0); 

    const [startCountDown, setStartCountDown] = useState("") 

    const [openMContainer, setOpenMContainer] = useState(false)

    window.addEventListener("resize", function(){ 

        setScreenWidth( window.innerWidth) 

      }); 

      const lobbyType = props.match.params.lobbyType //1: creator, 2: student 

    var navClass = classNames({ 

        "navbar-collapse": true, 

        'show': nav.isOpen, 

        'collapse':  true, 

        toggler:nav.isOpen?"": "collapsed" 

      }); 

    var toggler = classNames({ 

      "collapsed":nav.isOpen?"":"collapsed" 

      }); 

 
 

      const preload = (forced) =>{ 

//    console.log(history.location.pathname, `/quest/${props.match.params.questId}/lobby`, history.location.pathname ==`/quest/${props.match.params.questId}/lobby/`) 

        if(!isAuthenticated()&&!getPlayer()) 

        { 

            ErrToast(t('messages.error.joinWithoutGameCode'), 2000) 

            history.push(`/quest/join`) 

        } 

 
 

        getLobbyDetails({gameId: props.match.params.questId}).then( 

            async res=>{ 

                 if(res.error) 

                 { 

                 return console.log("Lobby Data not Found") 

                 } 

                 else if(res&&res.data&&res.data.result) 

                 { 

                     setLobbyDetails(res.data.result) 

  

                     const timeDiff = getTimeDifference(res.data.result.gameData.startTime) 

                     const status = res.data.result.gameData.status 

                     setGameStatus(res.data.result.gameData.status) 

  


                    if(status==0 && !forced && (lobbyType=='1' || lobbyType=='2'))
                    { 
                        if(res.data.result.gameData.timeLimit>0)
                        {
                        GameDetailsInterVal(5000); 
                        }
                        if(lobbyType=='1'&&timeDiff>(-60)) 

                        { 

                            setStrtBtn(false) 

                        } 

                    } 

                    else if (status==2) 

                    { 

                        if(lobbyType == '1') { 

                            history.push(`/quest/${props.match.params.questId}/result`) 

                        } 

                        else if(lobbyType=='2') 

                        { 

                            history.push(` /quest/${props.match.params.questId}/${getPlayer().userName}/result`) 

                        } 

                        // else(1) 

                        // { 

 
 

                        // } 

                    } 

                    else if (status==1) 
                    { 

                     if(lobbyType=='2') 

                        { 

                            countDownStudent(5) 

                            setTimeout(() => { 

                                history.push(`/quest/${props.match.params.questId}/playground/2`) 

                            }, 6000); 

                        } 

                    else if(lobbyType=='1' ) 
                    { 
                        if(res.data.result.gameData.timeLimit>0)
                        {
                            const temptimer = parseInt(res.data.result.gameData.timeLimit)*60-timeDiff 

                            if(temptimer>0) 
    
                            { 
                            countdown(temptimer-1)
                            } 
    
                            else{ 
    
                                setTimer("00:00") 
    
                            } 
                           
                        }else{
                            setStrtBtn(false)
                            setTimer("")
                        }
                    } 

                    } 

                 } 

                 else{ 

                     return console.log("Lobby Error") 

                 } 

             } 

         ) 

      } 

 
      const GameDetailsInterVal = (time) => { 

          setTimeout(async () => { 
            preload(false) 
        }, time); 

      } 


      useEffect(() => { 

         preload(false); 
      }, []) 

 
    const countdown = (sec) => { 

        if(sec>=0) 

        { 

            const min = parseInt(sec/60); 

            const seconds = sec%60; 

            if(sec == 0) 

            { 

               setGameStatus(2) 

               history.push(`/quest/${props.match.params.questId}/result`) 

            } 

            let tempTime = (min>9?min:("0"+ min)) + ":"+ (seconds>9?seconds:("0"+seconds)) 

            setTimer(tempTime) 

            setTimeout(()=>countdown(sec-1), 1000) 

        } 

    } 

 
 
 

    const countDownStudent = (sec) => { 

       if(sec>0) 

       { 

        setTimeout(() => { 

            setStartCountDown(sec*2) 

         setTimeout(() => { 

             setStartCountDown((sec*2)-1) 

             countDownStudent(sec-1) 

         }, 500); 

        }, 500); 

       } 

       else if(sec==0) 

       { 

           console.log("Lets go") 

       } 

    } 

    

    const CountdownContainer = () => { 

        return ( 

            <div className = "countStCont"> 

               <div className = "align-self-center mx-auto"> 

               <p>{startCountDown}</p> 

               </div> 
            </div> 

        ) 

    } 

 
 

      const handleStart = () => { 


            startGame({gameId: props.match.params.questId, userId:isAuthenticated().id}).then( 

               async res => { 

                    if(res.error) 

                    { 

                        ErrToast(res.error, 2000) 

                    } 

                    else if(res&&res.data.result) 

                    { 

                        
                        await preload(true); 

                        SuccessToast("Game Started", 2000) 

                        // setGameStatus(1); 


                    } 

                    else{ 

                        console.log("Lobby Error") 

                    } 

                } 

            ).catch(err =>{  

               ErrToast(err.response.data.error, 2000) 

            }) 

      } 

 
 
 

      const ParticipantsList = () => { 

          return ( 

            <div className="row"> 

             <label className = "text-white mb-3 ml-2" style = {{fontSize: '.7em'}}>{lobbyDetails.userData.length}  {t('component.label.participantsJoined')}</label> 

                { 

                    lobbyDetails&&lobbyDetails.userData&& 

                    lobbyDetails.userData.map((user, i) => { 

                       return <div key = {user._id} className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12  align-items-center mb-3"> 

                         <p className="text-white mb-0 customLabel">{user.username}</p> 

                        </div> 

                    }) 

                } 

        </div> 

          ) 

      } 

 
 
 

      const LobbyContent = () => { 

        return ( 

            <div className="container-fluid startGameWrapper p-4 py-5"> 

                {startCountDown&&CountdownContainer()} 

             

                <div className="row justify-content-center"> 

                    <div className="col-xl-6  col-lg-6 col-md-12 col-sm-12 col-12 pr-lg-6"> 

                        <div className="row" id = "detailsGame"> 

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> 

                                <h2 className="font-roboto-bold text-white mb-3">{lobbyDetails.gameData.title} </h2> 

                                <div className="dateTimeContentBox d-flex py-3"> 

                                    <label className="text-white customLabel font-roboto-regular">{t('component.label.date')}: {getDisplayFormatDate(lobbyDetails.gameData.startTime) }</label> 

                                    <label className="text-white ml-4 customLabel font-roboto-regular">{t('component.label.timelimit')} : {lobbyDetails.gameData.timeLimit} {t('component.label.minutes')} </label> 

                                    {/* {timer&& <label className="text-white ml-4 customLabel font-roboto-regular">Ending in {timer} Minutes</label>} */} 

                                </div> 

                            </div> 

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12"> 

                                <div className="potraitContent mb-4"> 

                                    <p className="font-roboto-regular font12"> 

                                        {lobbyDetails.gameData.description} 

                                    </p> 

                                </div> 

                            </div> 

                            <div className = 'row'> 

                            <div className="col-xl-6  col-lg-6  col-md-12  col-12"> 

                                <Card className="customCard mb-4"> 

                                    <Card.Body>
                                    <img src={lobbyDetails.gameData.coverImage}  className="img-fluid"  alt = "cover" /> 
                                    </Card.Body>

                                    

                                    <Card.Footer className = "text-center" style = {{fontSize:".8em", background:"#454B67", color: 'white'}}> 

                                    {lobbyDetails.gameData.title} 

                                    </Card.Footer> 

                                </Card> 

                            </div> 

                            <div className="col-xl-6  col-lg-6  col-md-12  col-12"> 
                                <Card className="customCard mb-4"> 

                                    <Card.Body style = {{minHeight:"13.7em"}} className="d-flex"> 
                                        <div id="video-app" className = "align-self-center mx-auto d-flex">
                                            <AiFillPlayCircle className = "align-self-center mx-auto" size = {70} color = "white" onClick = {()=>{setOpenMContainer(true)}}/>
                                    </div>
                                    <div className = "d-flex ">
                            </div>
                                 

                                    </Card.Body> 

                                    <Card.Footer  className = "text-center" style = {{fontSize:".8em", background:"#454B67", color: 'white'}}> 

                                    {t('form.label.video')} 

                                    </Card.Footer> 

                                </Card> 
                                  <ModalContainer show = {openMContainer} setShow = {setOpenMContainer}>
                                  <VideoContainer src = {lobbyDetails.gameData.lobbyVideo} controls ={true}/>
                                </ModalContainer>
                                <AudioContainer className = {"d-none"} src = {lobbyDetails.gameData.backgroundMusic}  play = {true} pause={false} loop ={true}/>
                            </div> 
                            
                            </div> 

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 my-2" style = {{textAlign:screenWidth<992?"center":""}}> 
                           
                              { 

                                   isAuthenticated()&&isAuthenticated().token?( 

                                       <Fragment> 

                                          {/* {console.log(getTimeDifference("TimeDetails:",lobbyDetails.gameData.startTime)?getTimeDifference("TimeDetails:",lobbyDetails.gameData.startTime)<60:"notfound", getTimeDifference(lobbyDetails.gameData.startTime), 60, -247486<60 )} */} 

                                            { 

                                               lobbyDetails.gameData.status==1&&lobbyDetails.gameData.timeLimit>0?( 

                                                    <button  

                                                    className='startGameBtn text-white border-0 font-roboto-bold font12 my-3 text-uppercase' 

                                                    > 

                                                     {t('component.label.endsIn') + " " +timer + " "+ t('component.label.minutes')}   

                                                    </button> 
                                                ): 
                                                ( 

                                                    <button  

                                                    className='startGameBtn text-white  border-0 font-roboto-bold font12 my-3 text-uppercase' 

                                                    onClick = {gameStatus==0?handleStart:gameStatus==2 ||!timer?()=>{ 

                                                        history.push(`/quest/${props.match.params.questId}/result`) 

                                                    }:(e) => {e.preventDefault()} 

                                                } 

                                                    disabled = {strtBtn} 

                                                    > 

                                                    {gameStatus==0?t('form.label.start') +" "+ t('component.label.game'):gameStatus==2||!timer?t('component.label.result'):""} 

                                                    </button> 

                                                ) 

                                            } 

                                       </Fragment> 

                                   ):"" 

                               } 

                            </div> 

                        </div>                        

                    </div> 

                    <div className="col-xl-6  col-lg-6  col-md-12 col-sm-12 col-12 pl-lg-6"> 

                            <div className="participantList" onClick = {() => {setListCollapsed(!listCollapsed)}}> 

                            <h6 className="font-roboto-bold text-white m-1">{t('component.label.participant') +" "+ t('component.label.name')} {screenWidth>768?"" 

                            :<RiArrowDropDownLine size = {20} style = {{float:'right'}}/> 

                        }</h6> 

                               {screenWidth>768? ( 

                                   ParticipantsList() 

                               ) 

                               : 

                               <Collapse in = {!listCollapsed}> 

                                   { 

                                       ParticipantsList() 

                                   } 

                                   </Collapse> 

                            } 

                                 

                            </div> 

                    </div> 

                </div> 

            </div> 

        ) 

      } 

 
 
 

    return( 

        <Fragment> 

            <ToastContainer/> 

            <nav className="navbar navbar-expand-lg bg-theme-darkBlue py-4"> 

            <div onCLick = {() => {isAuthenticated()&&history.push('/')}}><img src = {Logo} alt = "logo" className="img-fluid logo" /></div> 

 
 

                 

                <button className={`navbar-toggler ${toggler}`} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"> 

                    <span className="navbar-toggler-icon text-white" onClick = { () => {setNav({isOpen:!nav.isOpen})}}><GiHamburgerMenu/></span> 

                </button> 

                {/* <div className={navClass} id="navbarText"> 

                    <ul className="navbar-nav ml-auto"> 

                     

                   


                        {isAuthenticated()&&isAuthenticated().token&&(<li className="nav-item" onClick = {() =>{setProfileDropdown(!profileDropdaown)}}> 

                        <img src = {profile} alt = "Profile" className={`img-fluid ${screenWidth<1000?"py-3":""}`}/> 

                        <Collapse className = "menu-profile" in = {profileDropdaown}  style = {{}}> 

                                    <div id="collapse-text1"> 

                                    <ul className = "list-group "> 

                                        

                                        <li  

                                        className = "list-group-item"  

                                        onClick = {() => {setCookie('user', "", 0);  

                                        history.push('/')}}> 

                                            {t('component.label.logout')} <span><BiLogOutCircle/></span> 

                                            </li> 

                                       </ul> 

                                    </div> 

                                </Collapse> 

                        </li>)} 

                         

                    </ul> 

                </div>  */}

            </nav> 

            {lobbyDetails&&LobbyContent()} 

        </Fragment> 

    ) 

} 

 
 
 

export default JoinRoom