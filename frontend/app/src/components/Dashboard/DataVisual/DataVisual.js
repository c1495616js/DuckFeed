import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

import DataPoints from './DataPoints';
import Food from './Food';
import Where from './Where';
import Time from './Time';
import FoodKind from './FoodKind';


export default class DataVisual extends Component {
  render() {
    return (
      <div style={{marginBottom: '15px', padding: '10px'}}>
        <Grid divided='vertically'>
          {/* ALL */}
          <Grid.Row>
            <Grid.Column>
              <DataPoints />
            </Grid.Column>
          </Grid.Row>
          {/* basic */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Time />
            </Grid.Column>
            <Grid.Column>
              <Where />
            </Grid.Column>            
          </Grid.Row>
          {/* food */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Food />
            </Grid.Column>
            <Grid.Column>
              <FoodKind />
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </div>
    )
  }
}
