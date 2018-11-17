import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './Spinner';
import qs from 'qs';
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
    const token = localStorage.getItem('ACCESS_TOKEN');
    
    if(token){
      // this.props.setUser(user);
      axios.post('http://localhost:8000/index.php/users/check_token',
        qs.stringify({token})
      ).then(r => r.data)
      .then(r => {
        console.log(r)
        if(r.valid){ 
          console.log('user valid');
          this.props.setUser(r.user);         
          this.props.history.push('/');
        }else{
          this.props.history.push('/login');
          localStorage.setItem('ACCESS_TOKEN', '');
          this.props.clearUser();
        }        
      })
    }else{
      this.props.history.push('/login');
      localStorage.setItem('ACCESS_TOKEN', '');
      this.props.clearUser();
    }
  }
 
  render() {
    return (

      this.props.isLoading ? <Spinner/> : (
        <Switch >
          <Route exact path = "/" component = {App} /> 
          <Route path = "/login"  render={(props) => <Login {...props} setUser={this.props.setUser}/>} />
          <Route path = "/register" render={(props) => <Register {...props} setUser={this.props.setUser}/>}/> 
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