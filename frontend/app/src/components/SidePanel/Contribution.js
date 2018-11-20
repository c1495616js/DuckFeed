import React, { Component } from 'react';
import {connect} from 'react-redux';

import Api from '../../Api';
import qs from 'qs';
import { Table } from 'semantic-ui-react';

class Contribution extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps({ search }) {    
    if(Array.isArray(search) && search.length === 0){      
      this.fetchData();
    }
  }

  fetchData = () => {
    Api.post('feed/list_feed',
      qs.stringify({contribution: true})
    ).then(r => r.data)
    .then(({list}) => {              
      this.setState({data: list})      
    })
    .catch( err =>{
      console.error(err);
    })
  }

  displayTableCell = () => {
    const { data } = this.state;
    const { currentUser } = this.props;
    
    if(!data){
      return (
        <Table.Row>
          <Table.Cell colSpan='2'>Proccessing...</Table.Cell>
        </Table.Row>
      )
    }
    return data.map((r, index) => {
      return (
        <Table.Row key={r.id}>
          <Table.Cell textAlign="center">
            <p className={currentUser.id === r.user_id ? 'ownContribution' : ''}>
              {index+1}
            </p>
          </Table.Cell>
          <Table.Cell> 
            <p className={currentUser.id === r.user_id ? 'ownContribution' : ''}>
              {r.user_name}                      
            </p>                        
          </Table.Cell>
          <Table.Cell textAlign="center">
            <p className={currentUser.id === r.user_id ? 'ownContribution' : ''}>
              {r.total_cnt}                      
            </p> 
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    return (
      <div className="contribution">
          <h4>Rank of Contribution</h4>
          <Table basic='very' celled collapsing color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Contribute</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
            {this.displayTableCell()}            
          </Table.Body>
        </Table>
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

export default connect(mapStateToProps)(Contribution)