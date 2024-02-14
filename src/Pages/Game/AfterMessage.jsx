import React, { useState , Fragment} from 'react';
import './style.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import SadSmiley from '../../assets/img/smiley-sad.svg'
import HappySmiley from '../../assets/img/smiley-happy.svg'
import Background from '../../assets/img/bg-result2.png'
import HeaderPlay from '../../Components/Headers/HeaderPlay';
import { getPlayer } from '../../Helper/Util';
import { useTranslation } from 'react-i18next';

export default function AfterMessage(props) {

  const [t] = useTranslation()

  const score = parseInt(getPlayer().score)
  const history = useHistory();

  const pageBody = (props) => {
      return (
        <div className ="h-100 result_Cont">
        <div className='result-bgimage h-100' style = {{backgroundImage: score<70?"":`url(${Background})`}}>
      <div className='container-fluid h-100'>
        <div className='row h-100 justify-content-center'>
          <div className='col-lg-4 col-md-8 col-11 align-self-center'>
            <div className='bg-result p-4'>
              <div className='form-icon text-center'>
                <img src = {score<70? SadSmiley:HappySmiley}  alt = {score<70? "sad": "happy"}/>
              </div>
              <div className='form-heading'>
                <h3 className='text-center font-roboto-regular-bold mb-4 text-white'>{t('component.label.hey')}, {getPlayer().userName}!</h3>
              </div>
              <div className='form-message'>
                  <p className='text-center font-roboto-regular mb-2 text-white px-3'>
                  {
                  score<70?
                  <Fragment>
                     {t('messages.desc.lossMsg')}
                  </Fragment>
                  :
                  <Fragment>
                  {t('messages.desc.winMsg')}
               </Fragment>
                 }
                  </p>
                  <h5 className ='text-center font-roboto-bold mb-2 text-white px-3 py-2'>
                    {t('messages.desc.scoreMsg')} {score}%
                  </h5>
              </div>
            
            {/* <div className = "w-100 text-center">
             <button onClick={() => {history.push("/join-room")}} className='btn btn-rqstJoin text-white border-0 font-roboto-bold font14 my-3 py-2'>
               Play Again
              </button>
             </div> */}

             
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
      )
  }


  return (
      <Fragment>
      <HeaderPlay timer = {"_:_ _"}/>
      {pageBody(props)}
      </Fragment>
  );
}
