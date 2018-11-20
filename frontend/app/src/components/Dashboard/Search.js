import React, { Component } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react';
import {connect} from 'react-redux'
import { doSearch } from '../../actions';

import Api from '../../Api';


class Search extends Component {
  state = {
    park:[],
    name:[],
    kind:[],
    parkOptions:[],
    foodOptions:[],
    kindOptions:[]
  }

  componentDidMount() {
    this.fetchOptionData()
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

  fetchOptionData = () => {
    Api.post('feed/list_all_options').then(r => r.data)
    .then(({error_code, option_park, option_food, option_kind}) => {
      if(error_code === 'Authorization Error'){                
        return;
      }
      this.setState({
        parkOptions: option_park.map(j => ({ key: j.id, value: j.park, text: j.park })),
        foodOptions: option_food.map(j => ({ key: j.id, value: j.name, text: j.name })),
        kindOptions: option_kind.map(j => ({ key: j.id, value: j.kind, text: j.kind })),
      })
    })
    .catch( err =>{
      console.error(err);
    })   
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
    const { park, name, kind, parkOptions, foodOptions, kindOptions } = this.state;
    return (
      <div className="search">
        <Segment>
          <h2>Search Bar</h2>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>                
                  <Dropdown 
                    placeholder='Park'
                    fluid multiple search selection 
                    options={parkOptions}
                    value={park}
                    onChange={this.handleParkChange}                
                  />                
              </Grid.Column>              
              <Grid.Column> 
                <Dropdown 
                  placeholder='Name of Food'
                  fluid multiple search selection                              
                  options={foodOptions}
                  value={name}
                  onChange={this.handleFoodChange}                
                />                
              </Grid.Column>
              <Grid.Column>                
                <Dropdown 
                  placeholder='Kind of Food'
                  fluid multiple search selection 
                  options={kindOptions}
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