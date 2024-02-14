import React ,{useState, useEffect} from 'react'
import { Collapse } from 'react-bootstrap';
import { BsFillEyeFill, BsQuestionSquare } from 'react-icons/bs/index';
import ProfileImg from '../../assets/img/profileImage.png'
import Clock from '../../assets/img/clock.svg'
import KeyEnable from '../../assets/img/keyEnable.svg'
import KeyDisable from '../../assets/img/keyDisable.svg'
import LockImg from '../../assets/img/img-lock.svg'
import Media from 'react-bootstrap/Media';
import { Fragment } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { ErrToast, getPlayer, isAuthenticated, setCookie } from '../../Helper/Util';
import { useHistory } from 'react-router-dom';
import { SubmitWinningPoints } from '../../Pages/PlayGround/helper';

import './style.css'


const HeaderPlay = ({result, question,...props}) => {

  const history = useHistory()

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [screenWidth, setScreenWidth] = useState(window.screen.width)

  // const [resultState, setResultState] = useState(result&&result)

  const totalQues = !isAuthenticated()&&getPlayer()?  Array(getPlayer().totalQues).fill(0):""

  window.addEventListener("resize", function(){
    setScreenWidth( window.innerWidth)
  });

  useEffect(() => {
    if(props.timer=='0:00')
    {
      handleFinish()
    }
  }, [props.timer])
  

  const handleFinish = async() => {
    const correct = await result&&result.filter((obj)=>{
      return obj.result==1
    }) 

    const tempResult = correct=="undefined"?0:await(correct.length/question.length)*100

    await SubmitWinningPoints({memberId :getPlayer().id, winningPoint : tempResult?tempResult:0}).then(
      res=>{
        if(res.error)
        {
          ErrToast(res.error, 2000)
        }
        else if(res&&res.result)
        {
          setCookie("player", {id: getPlayer().id, userName: getPlayer().userName, score: tempResult, totalQues: question.length, correct: correct.length}, 0.05)
          
        }
        else{
          console.log("Error in Submitting result")
        }
      }
    )
    history.push(`/quest/${props.gameId}/${getPlayer().userName}/result`)

  }



  return (
        <div className="wrapper-header fixed-top headerZindex">
          <div className="row m-0">
          <div className="col-lg-12 col-md-12 col-12 text-right pb-2">
             { screenWidth>768?"":<GiHamburgerMenu className ="text-white mt-3 ml-auto" size ={20} onClick = {() => {setIsCollapsed(!isCollapsed)} }/>}
             </div>
            {/* {console.log("Resultjhjkdh:", result, result)} */}
              {
                screenWidth>768?
                (
                  <Fragment>
                    <div className="col-lg-6 col-md-6 col-12 text-left align-self-center">
                    <p className="text-theme-grey font-roboto-Medium font14 mb-0">
                       { 
                       props.timer!=="_:_ _"?
                       <button className =" timerClock" src = {Clock} alt = "timer" 
                       >
                        {props.timer.split(":")[0] +" : "+ props.timer.split(":")[1]}
                        </button>:  <button className =" timerClock" src = {Clock} alt = "timer" 
                       >
                         01 : 45
                        </button>
                        }
                        
                      
                    </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 align-self-center text-right">
                  <div className="wrapper-button d-inline-block p-4">

                  


                    {
                       totalQues?totalQues.map((obj, i)=>{
                       
                          return  <button key = {i} className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {i<getPlayer().correct?KeyEnable:KeyDisable} alt ="key" />
                          </button>
                        }):""
                      }

                      {
                        question?question.map((obj, i)=>{
                       
                          return  <button className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {KeyDisable} alt ="key" />
                          </button>
                       
                         
                        }):""
                      }
                      {/* {
                        result?result.map((obj, i)=>{
                          if(obj.result)
                         {
                          return  <button className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {KeyEnable} alt ="key" />
                          </button>
                         }
                         
                        }):""
                      }
                          {
                        result?result.map((obj, i)=>{
                          if(!obj.result)
                         {
                          return  <button className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {KeyDisable} alt ="key" />
                          </button>
                         }
                      
                        }):""
                      } */}
                      {console.log(getPlayer().score)}
                     {
                        getPlayer().score||getPlayer().score==0?"": <button className="btn keyButton ml-2 text-bgcolor-darkgrey" onClick = {handleFinish}>
                        <img src = {LockImg} alt ="key" />
                        </button>
                     }
                   
                      
                  </div>
                  {/* <GiHamburgerMenu className ="text-white mt-3" size ={20} onClick = {() => {setIsCollapsed(!isCollapsed)} }/> */}
              </div>
                  </Fragment>
                )
                :
                <Collapse in={!isCollapsed}>
                  
                  <div>
                   { props.timer&&<div className="col-lg-12 col-md-12 col-12 text-center align-self-center">
                    <p className="text-theme-grey font-roboto-Medium font14 mb-0">
                        <img src = {Clock} alt = "timer" style = {{width:"8em"}}/>
                    </p>
                  </div>}
                  <div className="col-lg-12 col-md-12 col-12 text-center align-self-center ">
                  <div className="wrapper-button d-inline-block p-4">
                  {
                        result?result.map((obj, i)=>{
                          if(obj.result)
                         {
                          return  <button className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {KeyEnable} alt ="key" />
                          </button>
                         }
                         
                        }):""
                      }
                          {
                        result?result.map((obj, i)=>{
                          if(!obj.result)
                         {
                          return  <button className="btn keyButton  text-bgcolor-darkgrey">
                          <img src = {KeyDisable} alt ="key" />
                          </button>
                         }
                      
                        }):""
                      }
                      
                     {
                       getPlayer().score?"": <button className="btn keyButton ml-2 text-bgcolor-darkgrey" onClick = {handleFinish}>
                       <img src = {LockImg} alt ="key" />
                       </button>
                     }
                   
                      
                  </div>
              </div>
              </div>
                
                </Collapse>
              }
          </div>
          {
            // console.log(isCollapsed)
          }
        </div>
    )
}

export default HeaderPlay
