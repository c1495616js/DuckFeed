import React, { Component } from 'react'
import axios from 'axios';
import qs from 'qs';
import { Header, Table } from 'semantic-ui-react';

export default class Contribution extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
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
    if(!data){
      return (
        <Table.Row>
          <Table.Cell colSpan='2'>Proccessing...</Table.Cell>
        </Table.Row>
      )
    }
    return data.map(r => {
      return (
        <Table.Row>
          <Table.Cell>
            <Header as='h4' image>                  
              <Header.Content>                  
                {r.user_name}
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{r.total_cnt}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    return (
      <div className="contribution">
          <Table basic='very' celled collapsing color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Contribution</Table.HeaderCell>
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
