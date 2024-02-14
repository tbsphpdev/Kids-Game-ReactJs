import React, {Fragment} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../../Helper/PrivateRoute';
import { questRoutes } from '../../../routes';
import NotFound from '../../NotFound';

const QuestRoutes = (props) => {
    return (
       <Fragment>

           <Switch>
               {
               questRoutes.map((route,i) => {
              return <PrivateRoute key = {i} exact path = {route.path} component = {route.component} />
            })}
          <Route  path = "*" component = {NotFound}></Route>

           </Switch>
           
       </Fragment>
    )
}

export default QuestRoutes
