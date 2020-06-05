import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.min.css';
import './App.css';
// Components
import Navbar from './components/navbar/Navbar.jsx';
import Routes from './components/routing/Routes';
// Utils
import setAuthToken from './utils/setAuthToken';
// Actions
import { loadUser } from './store/actions/auth';
// Redux
import store from './store/';
import { Provider } from 'react-redux';



const App = () => {
  
  useEffect(()=>{
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}


export default App;



