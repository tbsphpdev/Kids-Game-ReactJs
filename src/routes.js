import React from 'react';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerifyUser from './Pages/VerifyUser/verifyUser';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Quests from './Pages/Quests/Quests';
import Playground from './Pages/PlayGround/Playground';
import JoinRoom from './Pages/Game/JoinRoom';
import JoinByCode from './Pages/Game/joinByCode';
import AfterMessage from './Pages/Game/AfterMessage';
import QuestResult from './Pages/Quests/QuestResult';
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Registration = React.lazy(() => import('./Pages/Register/Register'));

const unAuthRoutes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/verify-user',
    name: 'verify-user',
    component: VerifyUser,
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
  },
];


const publicRoutes = [
  {
    path: '/quest/join/:gameCode',
    name: 'joingame',
    component: JoinByCode,
  },
  {
    path: '/quest/join',
    name: 'joingame',
    component: JoinByCode,
  },
  {
    path: '/quest/:questId/lobby/:lobbyType',
    name: 'lobby',
    component: JoinRoom,
  },
  {
    path: '/quest/:questId/:Name/result',
    name: 'result',
    component: AfterMessage,
  },
  {
    path: '/quest/:questId/playground/:pgType',
    name: 'playground',
    component: Playground,
  },
  {
    path: '/quest/:questId/playground/:pgType/:setting',
    name: 'playground',
    component: Playground,
  },
  {
    path: '/quest/:questId/result',
    name: 'questResult',
    component: QuestResult,
  }
];


const questRoutes = [{
  path: '/quests',
  name: 'quests',
  component: Quests,
},


]

export{publicRoutes, questRoutes, unAuthRoutes};
