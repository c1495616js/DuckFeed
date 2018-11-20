import React, { Component } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react';
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

  componentWillReceiveProps({ search }) {    
    if(Array.isArray(search) && search.length == 0){
      this.setState({
        park:[],
        name:[],
        kind:[]
      })
    }
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
    const { park, name, kind } = this.state;
    return (
      <div className="search">
        <Segment>
          <h2>Search Bar</h2>
          <Grid >
            <Grid.Row>
              <Grid.Column width="3">                
                  <Dropdown 
                    placeholder='Park'
                    fluid multiple search selection 
                    options={parkOptions}
                    value={park}
                    onChange={this.handleParkChange}                
                  />                
              </Grid.Column>
              <Grid.Column width="6">
                Time
              </Grid.Column>
              <Grid.Column width="3"> 
                <Dropdown 
                  placeholder='Name of Food'
                  fluid multiple search selection                              
                  options={foodOptions}
                  value={name}
                  onChange={this.handleFoodChange}                
                />                
              </Grid.Column>
              <Grid.Column width="3">                
                <Dropdown 
                  placeholder='Kind of Food'
                  fluid multiple search selection 
                  options={foodOptions}
                  value={kind}
                  onChange={this.handleKindChange}
                />                
              </Grid.Column>
              
            </Grid.Row>      
          </Grid> 
        </Segment>                       
      </div>
    )
  }
}

const mapStateToProps = state => {  
  if(!state.search.currentSearch){
    return {
      search: []
    }
  }
  return {
    search: state.search.currentSearch,  
  }
}

export default connect(mapStateToProps, { doSearch } )(Search)