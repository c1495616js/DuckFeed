import React, { Component } from 'react'

import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react'


class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  }

  // (if using this method, you need to use if null case every time.)
  // componentDidMount(){
  //   this.setState({user: this.props.currentUser})
  // }


  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.name}</strong>
        </span>
      ),
      disabled: true
    },    
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>,      
    }
  ]

  handleSignout = () => {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => console.log('signed out!'))
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Grid style={{ background: '#4c3c4c' }}>
          <Grid.Column>
            <Grid.Row style={{ padding: '1.2em', margin: 0 }} >
              {/* App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="paw" />
                <Header.Content>DuckFeed</Header.Content>
              </Header>
            </Grid.Row>

            {/* User Dropdown */}
            <Header style={{padding:'0.25em'}} as="h4" inverted>
              <Dropdown 
                trigger={
                <span>
                  {user.name}
                </span>} 
                options={this.dropdownOptions()} />              
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default UserPanel;