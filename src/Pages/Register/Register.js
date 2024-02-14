import React, { useEffect, useState } from 'react';
import '../Register/style.css';
import eyeIcon from '../../assets/img/eyeIcon.svg';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Toast } from '../../Components/Toast';
import { toast } from 'react-toastify';
import { post } from '../../Helper/Api';
import { useTranslation } from 'react-i18next';
import { ErrToast, isEmail } from '../../Helper/Util';
import Logo from '../../assets/img/logo.svg'

export default function Register() {

  const [t] = useTranslation()

  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('authentication-page');

    return function cleanup() {
      document.body.classList.remove('authentication-page');
    };
  }, []);

  const goToSignIn = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const onSignUpBtnClick = () => {
    let isValid = validate();
    if (isValid) {
      post('users/register/', {
        name: name,
        email: email,
        password: password,
      })
        .then((res) => {
          toast.success(<Toast message={t('messages.success.registerSuccess')+'..!'} />);
          toast.success(<Toast message={t('messages.success.verifyMail')+'..!'} />);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
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
  };

  const validate = () => {
    if(!name){
       ErrToast(t('messages.error.requiredName'), 2000)
       return false
    }
    else if(!email)
    {
       ErrToast(t('messages.error.requiredEmail'),2000)
       return false
    }
    else if(!isEmail(email))
    {
      ErrToast(t('messages.error.validEmail'), 2000)
      return false
    }
    else if(!password)
    {
       ErrToast(t('messages.error.requiredPassword'), 2000)
       return false
    }
    else if(password.length<6)
    {
       ErrToast(t('messages.error.requiredMinPassLength'), 2000)
       return false
    }
    else if (password !== confirmPassword) 
    {
       ErrToast(t('messages.passwordMustSame') +'..!', 2000)
       return false
    }

    return true
  };

  return (
    <div className='homepage-bgimage h-100'>
      <div className='container-fluid h-100'>
        <div className='row h-100 justify-content-center'>
          <div className='col-lg-4 col-md-8 col-11 align-self-center'>
            <div className='escaply-signUp p-4 bg-white'>
              <Form>
                <div className='form-heading'>
                  <h3 className='text-dark-black text-center font-roboto-bold mb-4'> <img src = {Logo} alt = "logo" className = "shadowLogo"/> </h3> 
                  {/* //Escaply {t('form.label.signup')} */}
                </div>

                <Form.Group controlId='Name'>
                  <Form.Label className='text-dark-black font-roboto-medium font14'>
                    {t('form.label.name')}<span>*</span>
                  </Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    name='name'
                    size='lg'
                    placeholder={t('form.placeholder.name')}
                    className='font-roboto-medium name'
                  />
                </Form.Group>

                <Form.Group controlId='Email'>
                  <Form.Label className='text-dark-black font-roboto-medium font14'>
                  {t('form.label.email')}<span>*</span>
                  </Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    size='lg'
                    name='email'
                    placeholder={t('form.placeholder.email')}
                    className='font-roboto-medium email'
                  />
                </Form.Group>

                <Form.Group controlId='Password'>
                  <Form.Label className='text-dark-black font-roboto-medium font14'>
                  {t('form.label.password')}<span>*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={!isPasswordVisible && 'password'}
                      size='lg'
                      placeholder={t('form.placeholder.name')}
                      className='font-roboto-medium'
                    />
                    <InputGroup.Prepend onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      <InputGroup.Text>
                        <i class={isPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId='ConfirmPassword'>
                  <Form.Label className='text-dark-black font-roboto-medium font14'>
                  {t('form.label.cPassword')}<span>*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={!isConfirmPasswordVisible && 'password'}
                      size='lg'
                      placeholder={t('form.placeholder.cPassword')}
                      className='font-roboto-medium'
                    />
                    <InputGroup.Prepend onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                      <InputGroup.Text>
                        <i class={isConfirmPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>
                <Button onClick={onSignUpBtnClick} className='btn signUpBtn w-100 border-0 font-roboto-bold font14 my-3 py-2'>
                  {t('form.label.signup')}
                </Button>

                <p className='text-center signUpLink font14 font-roboto-medium'>
                  {t('form.label.alreadyHaveAct')}?
                  <a onClick={goToSignIn} className='decoration ml-1 font-roboto-black'>
                  {t('form.label.signin')}
                  </a>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
