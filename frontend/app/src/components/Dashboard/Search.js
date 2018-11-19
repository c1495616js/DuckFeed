import React, { Component } from 'react'
import { Dropdown, Grid, Segment  } from 'semantic-ui-react';

const stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }]

export default class Search extends Component {
  state = {
    park:[],
    name:[],
    kind:[]
  }

  render() {
    return (
      <div className="search">
        <Segment>
          <h2>Search Bar</h2>
          <Grid >
            <Grid.Row>
              <Grid.Column width="3">
                <Segment>
                  <Dropdown placeholder='Park' fluid multiple search selection options={stateOptions} />
                </Segment>
              </Grid.Column>
              <Grid.Column width="6">
                <Segment>
                
                </Segment>
              </Grid.Column>
              <Grid.Column width="3">
                <Segment>
                  <Dropdown placeholder='Name of Food' fluid multiple search selection options={stateOptions} />
                </Segment>
              </Grid.Column>
              <Grid.Column width="3">
                <Segment>
                  <Dropdown placeholder='Kind of Food' fluid multiple search selection options={stateOptions} />
                </Segment>
              </Grid.Column>
              
            </Grid.Row>      
          </Grid> 
        </Segment>                       
      </div>
    )
  }
}
