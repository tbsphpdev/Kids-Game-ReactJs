import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { post } from '../../Helper/Api';
import { Toast } from '../../Components/Toast';
import { IoMdArrowRoundBack } from 'react-icons/io/index';
import './style.css';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from '../../Components/Loader';
import Dialog from '@material-ui/core/Dialog';


export default function ForgetPassword() {

  const history = useHistory()
  const [t] = useTranslation()

  const [email, setEmail] = useState('');
  const [emailSentStatus, setEmailSentStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.body.classList.add('authentication-page');
    return function cleanup() {
      document.body.classList.remove('authentication-page');
    };
  }, []);

  const onForgetPasswordBtnClick = () => {
    post(
      'users/forgot-password/',
      {
        email: email,
      },
      {} // no headers required!
    )
      .then((res) => {
        setIsLoading(true)
       
        setTimeout(() => {
          setEmailSentStatus(true)
          setIsLoading(false)
        }, 1500);
        // toast.success(<Toast message={ t('messages.success.resetPassFromMail') +'..!'} />);
        setEmail('');
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response?.data?.data?.errors) {
          for (const errMessages in err.response.data.data.errors) {
            toast.error(<Toast message={err.response.data.data.errors[errMessages]} />);
          }
        } else if (err.response?.data?.error) {
          toast.error(<Toast message={err.response.data.error} />);
        } else {
          toast.error(<Toast message={ t('messages.error.somethingWrong') +'..!'} />);
        }
      });
  };


  const resetPassForm = () => {
    return (
      <div>
         <Form.Group controlId='formBasicEmail'>
                <Form.Label className='text-dark-black font-roboto-medium font14'>
                  {t('form.label.email')}<span>*</span>
                </Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type='email' size='lg' placeholder={t('form.placeholder.email')} className='font-roboto-medium' />
              </Form.Group>

              <Button onClick={onForgetPasswordBtnClick} className='btn loginFormBtn w-100 border-0 font-roboto-bold font14 my-3 py-2'>
               {t('form.label.resetPass')}
              </Button>
             
      </div>
    )
  }



  const ModalLoad = () => {
    return (
        <div className = "justify-content-center" style = {{position:"absolute", background: 'rgb(0 0 0 / 31%)', width:"100vw", height: "100vh", top:0}}>
          <Loader/>
        </div>
    )
}



  const emailSentMessage = () =>{
    return (
      <div>
        <p>
       {t('messages.success.resetPassFromMail')}
        </p>
      </div>
    )
  }

  return (
    <Fragment>  
    <div className='homepage-bgimage h-100'>
      <div className='container-fluid h-100'>
        <div className='row h-100 justify-content-center'>
          <div className='col-lg-4 col-md-8 col-11 align-self-center'>
            <div className='escaply-login p-4 bg-white'>
              <div className='form-heading'>
                <h3 className='text-dark-black text-center font-roboto-bold mb-4'>{t('form.label.forgotPass')}</h3>
              </div>
              {
                emailSentStatus?emailSentMessage():resetPassForm()
              }
              
            
              <button className = "btn btn-navigate" onClick = {() => {emailSentStatus? setEmailSentStatus(false):history.goBack()}}><IoMdArrowRoundBack/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isLoading&&ModalLoad()}
    </Fragment>
  );
}
