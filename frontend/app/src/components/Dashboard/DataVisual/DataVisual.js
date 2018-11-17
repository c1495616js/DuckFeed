import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react';

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
          {/* basic */}
          <Grid.Row>
            <Grid.Column>
            <DataPoints />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
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
