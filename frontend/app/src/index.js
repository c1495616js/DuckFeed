import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './Spinner';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css';

import {
  createStore
} from 'redux';
import {
  Provider,
  connect
} from 'react-redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

import rootReducers from './reducers';
import { setUser, clearUser } from './actions';

const store = createStore(rootReducers, composeWithDevTools());
class Root extends React.Component {
  componentDidMount = () => {
    console.log(this.props.isLoading);
    const TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if(TOKEN){
      // this.props.setUser(user);
      this.props.history.push('/');
    }else{
      this.props.history.push('/login');
      this.props.clearUser();
    }
  }

  
  render() {
    return (

      this.props.isLoading ? <Spinner/> : (
        <Switch >
          <Route exact path = "/" component = {App} /> 
          <Route path = "/login" component = {Login}/> 
          <Route path = "/register" component = {Register}/> 
        </Switch>
      )

    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})
  


const RootWithAuth = withRouter(
    connect(mapStateToProps, { setUser, clearUser })(Root)
  );

ReactDOM.render( 
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();