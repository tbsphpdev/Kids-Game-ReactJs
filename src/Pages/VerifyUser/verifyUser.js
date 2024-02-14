import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { Toast } from '../../Components/Toast';
import { get } from '../../Helper/Api';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function VerifyUser(props) {

  const [t] = useTranslation()
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    get('users/change-tokenStatus/', {
      Authorization: queryString.parse(location.search).auth_token,
    })
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
          toast.error(<Toast message={t('messages.error.somethingWrong')+'..!'} />);
        }
      });

    return () => {};
  }, []);

  return <div> {t('messages.desc.verifyingMsg')} </div>;
}
