import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';

import SidePanel from './SidePanel/SidePanel'


const App = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{background:'#eee'}}>
  
    <SidePanel 
        key={currentUser && currentUser.id}
        currentUser={currentUser} 
      />

    <Grid.Column style={{marginLeft:320}}>
      <div>2</div>
    </Grid.Column>
    
    <Grid.Column width={4}>
      <div>3</div>
    </Grid.Column>
    
  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App);