import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

import Time from './Time';
import Food from './Food';
import Where from './Where';
import Numbers from './Numbers';
import FoodKind from './FoodKind';
import FoodMuch from './FoodMuch';

export default class DataVisual extends Component {
  render() {
    return (
      <div style={{marginBottom: '15px'}}>
        <Grid columns="equal" >
          <Grid.Column>
            <Time />
          </Grid.Column>

          <Grid.Column>
            <Food />
          </Grid.Column>

          <Grid.Column>
            <Where />
          </Grid.Column>
        </Grid>

        <Grid columns="equal" >
          <Grid.Column>
            <Numbers />
          </Grid.Column>

          <Grid.Column>
            <FoodKind />
          </Grid.Column>

          <Grid.Column>
            <FoodMuch />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
