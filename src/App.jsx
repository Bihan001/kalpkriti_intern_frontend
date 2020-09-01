// React Modules
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Actions
import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './PrivateRouting/PrivateRoute';

// Components
import Navbar from './components/Navbar';

// Pages
import AddMoney from './pages/addMoney';
import AdminPortal from './pages/adminPortal';
import CompleteAccount from './pages/completeAccount';
import ContactsImport from './pages/contactsImport';
import CreateActivity from './pages/createActivity';
import CreateCreator from './pages/createCreator';
import CreateTask from './pages/createTask';
import CreateVideo from './pages/createVideo';
import Creator from './pages/creator';
import CreatorDetails from './pages/creatorDetails';
import Creators from './pages/creators';
import CustomerHistory from './pages/customerHistory';
import Dashboard from './pages/dashboard';
import Deals from './pages/deals';
import EditActivity from './pages/editActivity';
import EditCreator from './pages/editCreator';
import EditCustomer from './pages/editCustomer';
import EditTask from './pages/editTask';
import EditVideo from './pages/editVideo';
import ForgotPassword from './pages/forgotPassword';
import Login from './pages/login';
import ResetPassword from './pages/resetPassword';
import Sales from './pages/sales';
import Task from './pages/task';
import TaskHistory from './pages/taskHistory';
import TasksV1 from './pages/tasksV1';
import UserProfile from './pages/userProfile';
import Users from './pages/users';
import Video from './pages/video';
import ViewTouches from './pages/viewTouches';

// CSS
import './css/style.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/completeAccount/:token' component={CompleteAccount} />
            <Route exact path='/forgotPassword' component={ForgotPassword} />
            <Route exact path='/resetPassword/:token' component={ResetPassword} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/addMoney/:id' component={AddMoney} />
            <PrivateRoute exact path='/adminPortal' component={AdminPortal} />
            <PrivateRoute exact path='/contactsImport' component={ContactsImport} />
            <PrivateRoute exact path='/createActivity/:video_id' component={CreateActivity} />
            <PrivateRoute exact path='/createCreator' component={CreateCreator} />
            <PrivateRoute exact path='/createTask' component={CreateTask} />
            <PrivateRoute exact path='/createVideo/:id' component={CreateVideo} />
            <PrivateRoute exact path='/creator/:id' component={Creator} />
            <PrivateRoute exact path='/creatorDetails/:id' component={CreatorDetails} />
            <PrivateRoute exact path='/creators' component={Creators} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/deals' component={Deals} />
            <PrivateRoute exact path='/editActivity/:id' component={EditActivity} />
            <PrivateRoute exact path='/editCreator/:user_id' component={EditCreator} />
            <PrivateRoute exact path='/editCustomer/:id' component={EditCustomer} />
            <PrivateRoute exact path='/editTask/:id' component={EditTask} />
            <PrivateRoute exact path='/editVideo/:id' component={EditVideo} />
            <PrivateRoute exact path='/history/:id' component={CustomerHistory} />
            <PrivateRoute exact path='/sales' component={Sales} />
            <PrivateRoute exact path='/taskHistory/:id' component={TaskHistory} />
            <PrivateRoute exact path='/tasks' component={TasksV1} />
            <PrivateRoute exact path='/touches/:id' component={ViewTouches} />
            <PrivateRoute exact path='/user/:id' component={UserProfile} />
            <PrivateRoute exact path='/users' component={Users} />
            <PrivateRoute exact path='/video/:id' component={Video} />
            <PrivateRoute exact path='/viewTask/:id' component={Task} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
