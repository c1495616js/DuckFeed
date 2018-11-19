import React, { Component } from 'react'
import { Icon, Table, Menu } from 'semantic-ui-react'

import Api from '../../Api';
import qs from 'qs';
export default class DataTable extends Component {

  state = {
    data: null,
    page: 0
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = () => {
    Api.post('feed/list_feed',
      qs.stringify({page: this.state.page})
    ).then(r => r.data)
    .then(({list}) => {      
      this.setState({data: list});
    })
  }

  renewData = () => {
    this.setState({data: null}, this.fetchData)
  }

  // Table Body
  displayTableBody = () => {
    const { data } = this.state;    
    return !data ? (<Table.Row><Table.Cell colSpan='6'>Processing...</Table.Cell></Table.Row>) : 
      data.map(r => {
       return (
          <Table.Row key={r.id}>
            <Table.Cell>{r.park}</Table.Cell>
            <Table.Cell>{r.time}</Table.Cell>
            <Table.Cell textAlign='right'>{r.numbers}</Table.Cell>
            <Table.Cell textAlign='center'>{r.name}</Table.Cell>
            <Table.Cell textAlign='center'>{r.kind}</Table.Cell>
            <Table.Cell textAlign='center'>{r.amount}</Table.Cell>                        
          </Table.Row>
       )
      })
    
  }

  // Pages
  displayPages = () => {
    return (
      <React.Fragment>
        <Menu.Item as='a'>1</Menu.Item>
        <Menu.Item as='a' onClick={() => this.changePage(1)}>2</Menu.Item>
        <Menu.Item as='a'>3</Menu.Item>
        <Menu.Item as='a'>4</Menu.Item>
      </React.Fragment>
    )
  }

  changePage = (page) => {
    this.setState({page}, this.renewData);
  }

  render() {
    
    return (
      <div className="dataTable">
          <h1>Data Table</h1>
          <Table celled structured>

          {/* Header */}
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell rowSpan='2'>Where</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Time</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Numbers</Table.HeaderCell>
                <Table.HeaderCell colSpan='3'>Food</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Kind</Table.HeaderCell>
                <Table.HeaderCell>Amount (kg)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          
          {/* Body */}
            <Table.Body>
              {this.displayTableBody()}
            </Table.Body>

          { /* footer */}

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='6'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    {this.displayPages()}
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>

        </Table>
      </div>
    )
  }
}
