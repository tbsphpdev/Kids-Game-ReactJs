import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { post } from '../../Helper/Api';
import { toast } from 'react-toastify';
import { Toast } from '../../Components/Toast';
// import { Form, Button } from 'react-bootstrap';
import { ErrToast } from '../../Helper/Util';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './style.css';

export default function ResetPassword() {

  const [t] = useTranslation()
  const location = useLocation();
  const history = useHistory();


  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('authentication-page');
    return function cleanup() {
      document.body.classList.remove('authentication-page');
    };
  }, []);


  const handleSubmit = () =>{

    if(!password)
    {
      return ErrToast(t('messages.error.requiredNewPassword') , 2000)
    }
    else if(password.length<6)
    {
      return ErrToast(t('messages.error.requiredMinPassLength'), 2000)
    }
    else if(password!==cPassword)
    {
      return ErrToast(t('messages.error.passwordMustSame'), 2000)
    }

    post(
      'users/reset-password/',
      {
        password: password,
      },
      {
        Authorization: queryString.parse(location.search).fp_code,
      }
    )
      .then((res) => {
        toast.success(<Toast message={t('messages.error.verifyMailSuccess')+'..!'} />);
        history.push('/');
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
  }



  const handleKeyPress = (e) => {
    if(e.which==32)
    {
      return e.preventDefault()
    }
    if(e.which ==13)
    {
      handleSubmit();
    }
  } 

  return (
    <Fragment>  
    <div className='homepage-bgimage h-100'>
    <div className='container-fluid h-100'>
      <div className='row h-100 justify-content-center'>
        <div className='col-lg-4 col-md-8 col-11 align-self-center'>
          <div className='escaply-login p-4 bg-white'>
            <div className='form-heading'>
              <h3 className='text-dark-black text-center font-roboto-bold mb-4'>{t('form.label.resetPass')}</h3>
            </div>

            <Form.Group controlId='formBasicpassword'>
            <Form.Label className='text-dark-black font-roboto-medium font14'>
              {t('form.label.new')+ " "+ t('form.label.password')}<span>*</span>
              </Form.Label>
              <InputGroup>
                  <Form.Control
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} 
                   type={!isPasswordVisible && 'password'}
                   size ='lg' 
                   placeholder={t('form.placeholder.passwordNew')}
                   className='font-roboto-medium'
                   onKeyPress = {handleKeyPress}
                  />
                  <InputGroup.Prepend onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <InputGroup.Text>
                      {/* <Icon> */}

                      <i className={isPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} />

                      
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
             </Form.Group>
            <Form.Group controlId='formBasicCpassword'>
            <Form.Label className='text-dark-black font-roboto-medium font14'>
              {t('form.label.cPassword')}<span>*</span>
              </Form.Label>
              <InputGroup>
                  <Form.Control
                  value={cPassword} 
                  onChange={(e) => setCPassword(e.target.value)} 
                  type={!isCPasswordVisible && 'password'}
                  size ='lg' 
                  placeholder={t('form.placeholder.cPassword')}
                  className='font-roboto-medium'
                  onKeyPress = {handleKeyPress}  
                  />
                  <InputGroup.Prepend onClick={() => setIsCPasswordVisible(!isCPasswordVisible)}>
                    <InputGroup.Text>
                      {/* <Icon> */}

                      <i className={isCPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} />

                      
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
             </Form.Group>
           

            <Button onClick={handleSubmit} className='btn loginFormBtn w-100 border-0 font-roboto-bold font14 my-3 py-2'>
            {t('form.label.submit')}
            </Button>
            {/* <button className = "btn btn-navigate" onClick = {() => {history.goBack()}}><IoMdArrowRoundBack/></button> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  </Fragment>  
    );
}
