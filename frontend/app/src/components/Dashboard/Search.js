import React, { Component } from 'react'
import { Dropdown, Grid, Segment  } from 'semantic-ui-react';
import {connect} from 'react-redux'
import { doSearch } from '../../actions';

const foodOptions = [ 
  { key: 's', value: 's', text: 's' },
  { key: '3', value: '3', text: '3' },
  { key: '4', value: '4', text: '4' },
  { key: '5', value: '5', text: '5' },
]

const parkOptions = [   
  { key: '3', value: '3', text: '3' },
  { key: '4', value: '4', text: '4' },
  { key: '5', value: '5', text: '5' },
]

class Search extends Component {
  state = {
    park:[],
    name:[],
    kind:[]
  }

  // handle search

  handleParkChange = (e, {value}) => {
    this.setState({park: value},
      () => this.props.doSearch(this.state)
    )
  }

  handleFoodChange = (e, {value}) => {
    this.setState({name: value},
      () => this.props.doSearch(this.state)
    )
  }

  handleKindChange = (e, {value}) => {
    this.setState({kind: value},
      () => this.props.doSearch(this.state)
    )
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
                  <Dropdown 
                    placeholder='Park'
                    fluid multiple search selection 
                    options={parkOptions} 
                    onChange={this.handleParkChange}                
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width="6">
                <Segment>
                
                </Segment>
              </Grid.Column>
              <Grid.Column width="3">
                <Segment>
                <Dropdown 
                placeholder='Name of Food'
                fluid multiple search selection                              
                options={foodOptions} 
                onChange={this.handleFoodChange}                
              />
                </Segment>
              </Grid.Column>
              <Grid.Column width="3">
                <Segment>
                <Dropdown 
                placeholder='Kind of Food'
                fluid multiple search selection 
                options={foodOptions}
                onChange={this.handleKindChange}
              />
                </Segment>
              </Grid.Column>
              
            </Grid.Row>      
          </Grid> 
        </Segment>                       
      </div>
    )
  }
}

export default connect(null, {doSearch} )(Search)