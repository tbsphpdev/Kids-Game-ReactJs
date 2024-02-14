import React, { useEffect } from 'react';

import { Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import {publicRoutes, privateRoutes, unAuthRoutes} from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QuestRoutes from './Components/Containers/RouteContainers/QuestRoutes';
import UnAuthRoutes from './Helper/UnAuthRoutes';
import NotFound from './Components/NotFound';
import { useTranslation, I18nextProvider } from 'react-i18next';
import LanguageDropDown from './Components/languageDropdown';

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);


function App() {
  const {t, i18n} = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
  return (
    <I18nextProvider i18n={i18n}>
    <React.Suspense fallback={loading}>
      <LanguageDropDown changeLanguage = {changeLanguage}/>
     
      <HashRouter>
        <Switch>


          {unAuthRoutes.map((x, i) => {
            return <UnAuthRoutes key={i} path={x.path} component={x.component} exact />;
          })}

          {
            publicRoutes.map((x, i) => {
              return <Route key={i} path={x.path} component={x.component} exact />;
            })
          }
          
          <Route  path = "/" component = {QuestRoutes}></Route>

        </Switch>
        </HashRouter>
      {/* </BrowserRouter> */}
    </React.Suspense>
    </I18nextProvider>
      );
}

export default App;
