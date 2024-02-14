import React, { useEffect, useState } from 'react';
import './style.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { post } from '../../Helper/Api';
import { Toast } from '../../Components/Toast';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { ErrToast, isEmail, setCookie } from '../../Helper/Util';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/img/logo.svg'


export default function Login() {

  const [t] = useTranslation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    document.body.classList.add('authentication-page');
    return function cleanup() {
      document.body.classList.remove('authentication-page');
    };
  }, []);

  const onLoginBtnClick = () => {


    if(!email)
    {
      return ErrToast(t('messages.error.requiredEmail'))
    }
    else if(!isEmail(email))
    {
      ErrToast(t('messages.error.validEmail'), 2000)
      return false
    }
    else if(!password)
    {
      return ErrToast(t('messages.error.requiredPassword'))
    }
    else if(password.length<6)
    {
      return ErrToast(t('messages.error.requiredMinPassLength'))
    }

    post(
      'users/login/',
      {
        email: email,
        password: password,
      },
      {} // no headers required!
    )
      .then((res) => {
        // console.log(res)
        // localStorage.setItem("user",JSON.stringify(res.data.result))
        toast.success(<Toast message={t('messages.success.loginSuccess')+'..!'} />);
        
        setCookie("user", res.data.result, 24)

        setEmail('');
        setPassword('');
        
        history.push('/quests')
        // localStorage.setItem('myCat', 'Tom');
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response?.data?.data?.errors) {
          for (const errMessages in err.response.data.data.errors) {
            toast.error(<Toast message={err.response.data.data.errors[errMessages]} />);
          }
        } else if (err.response?.data?.error) {
          toast.error(<Toast message = {err.response.data.error} />);
        } else {
          toast.error(<Toast message = {err.message} />);
        }
      });
  };

  const goToSignUp = (e) => {
    e.preventDefault();
    history.push('/registration');
  };

  const onForgetPasswordClick = () => {
    history.push('/forget-password');
  };

  const handleEnter = (e) => {
    if(e.charCode == 13)
    {
      onLoginBtnClick()
    }
  }



  return (
    <div className='homepage-bgimage h-100'>
      <div className='container-fluid h-100'>
        <div className='row h-100 justify-content-center'>
          <div className='col-lg-4 col-md-8 col-11 align-self-center'>
            <div className='escaply-login p-4 bg-white'>
              <div className='form-heading'>
                <h3 className='text-dark-black text-center font-roboto-bold mb-4'><img src = {Logo} alt = "logo" className = "shadowLogo"/></h3>
              </div>

              <Form.Group controlId='formBasicEmail'>
                <Form.Label className='text-dark-black font-roboto-medium font14'>
                  {t('form.label.email')}<span>*</span>
                </Form.Label>
                <Form.Control 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type='email' size='lg' 
                placeholder={t('form.placeholder.email')} 
                className='font-roboto-medium' 
                onKeyPress = {handleEnter}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label className='text-dark-black font-roboto-medium font14'>
                {t('form.label.password')}<span>*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={!isPasswordVisible && 'password'}
                    size='lg'
                    placeholder={t('form.placeholder.password')}
                    className='font-roboto-medium'
                    onKeyPress = {handleEnter}
                  />
                  <InputGroup.Prepend onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <InputGroup.Text>
                      {/* <Icon> */}

                      <i className={isPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} />

                      
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>

              <div className='float-left my-2 RemeberMe'>
                <Form.Label className='customCheckbox text-dark-black font-roboto-regular font14'>
                {t('form.label.rememberMe')}
                  <Form.Control type='checkbox' />
                  <span className='checkmark'></span>
                </Form.Label>
              </div>

              <div className='float-right my-2 forgetPassLink font16 font-roboto-regular'>
                <a onClick={onForgetPasswordClick} className='decoration'>
                {t('form.label.forgotPass')}?
                </a>
              </div>

              <Button onClick={onLoginBtnClick} className='btn loginFormBtn w-100 border-0 font-roboto-bold font14 my-3 py-2'>
              {t('form.label.login')}
              </Button>

              <p className='text-center signUpLink font14 font-roboto-medium'>
              {t('form.label.notRegistered')}?
                <a onClick={goToSignUp} className='decoration ml-1 font-roboto-black'>
                {t('form.label.signUpFree')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
