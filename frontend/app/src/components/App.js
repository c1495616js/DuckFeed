import React from 'react';

import './App.css';
import { connect } from 'react-redux';



const App = ({currentUser}) => (
    <div>App</div>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App);