import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react';

import DataPoints from './DataPoints';
import Food from './Food';
import Where from './Where';
import Time from './Time';
import FoodKind from './FoodKind';


export default class DataVisual extends Component {
  render() {
    return (
      <div style={{marginBottom: '15px', padding: '10px'}}>
        <Grid>
          {/* ALL */}
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <DataPoints />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          {/* basic */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Time />
              </Segment>              
            </Grid.Column>
            <Grid.Column>
              <Segment>              
                <Where />
              </Segment>              
            </Grid.Column>            
          </Grid.Row>
          {/* food */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Food />              
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <FoodKind />              
              </Segment>
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </div>
    )
  }
}
