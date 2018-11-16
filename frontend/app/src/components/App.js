import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';

import SidePanel from './SidePanel/SidePanel'
import Dashboard from './Dashboard/Dashboard'

const App = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{background:'#eee'}}>
  
    <SidePanel 
        key={currentUser && currentUser.id}
        currentUser={currentUser} 
      />

    <Grid.Column style={{marginLeft:250}}>
      <Dashboard currentUser={currentUser}/>
    </Grid.Column>
    
    
  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App);