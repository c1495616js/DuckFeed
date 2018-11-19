import React, { Component } from 'react'
import { Icon, Table, Menu, Segment, Dimmer, Loader } from 'semantic-ui-react'

import Api from '../../Api';
import qs from 'qs';
export default class DataTable extends Component {

  state = {
    data: null,
    page: 0,
    pages: 1
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = () => {
    Api.post('feed/list_feed',
      qs.stringify({page: this.state.page, need_pages: true})
    ).then(r => r.data)
    .then(({list, pages}) => {      
      this.setState({data: list, pages});
    })
  }

  renewData = () => {
    this.setState({data: null}, this.fetchData)
  }

  // Table Body
  displayTableBody = () => {
    const { data } = this.state;    
    return !data ? (
      <Table.Row>
        <Table.Cell colSpan='6'>
          <Segment>
            <Dimmer active>
              <Loader size='mini'></Loader>
            </Dimmer>
          </Segment>
        </Table.Cell>
      </Table.Row>) : 
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
    const { page, pages } = this.state;
    if(pages <= 7){
       return Array(pages).fill(0).map((row, index) => {
          return (
            <Menu.Item 
              as='a' 
              key={index}
              className={index === page ? 'currentPage' : ''}
              onClick={() => this.changePage(index)}
            >
              {index+1} 
            </Menu.Item>
          )
        });      
    }

    // pages > 7
    if(page <= 3){
      return [1,2,3,4,5,'...',pages].map((row, index) => {
        return (
          <Menu.Item 
            as='a' 
            key={index}
            className={row-1 === page ? 'currentPage' : row === '...' ? 'pageDisabled' : ''}
            onClick={() => this.changePage(row-1)}            
          >
            {row} 
          </Menu.Item>
        )
      }); 
    }

    if(page >= pages-4){
      return [1,'...',pages-4,pages-3,pages-2,pages-1,pages].map((row, index) => {
        return (
          <Menu.Item 
            as='a' 
            key={index}
            className={row-1 === page ? 'currentPage' : row === '...' ? 'pageDisabled' : ''}
            onClick={() => this.changePage(row-1)}            
          >
            {row} 
          </Menu.Item>
        )
      }); 
    }

    return [1,'...',page+1,page+2,page+3,'...',pages].map((row, index) => {
      return (
        <Menu.Item 
          as='a' 
          key={index}
          className={row-1 === page ? 'currentPage' : row === '...' ? 'pageDisabled' : ''}
          onClick={() => this.changePage(row-1)}          
        >
          {row} 
        </Menu.Item>
      )
    }); 
  }

  changePage = (page) => {
    if(isNaN(page) || page < 0 || page >= this.state.pages) return;
    this.setState({page}, this.renewData);    
  }

  render() {
    const{ page, pages } = this.state;
    return (
      <div className="dataTable">
        <Segment>                  
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
                    <Menu.Item 
                      as='a' 
                      icon
                      className={page === 0 ? 'pageDisabled' : ''}
                      onClick={() => this.changePage(page-1)}            
                    >
                      <Icon name='chevron left' />
                    </Menu.Item>
                    {this.displayPages()}
                    <Menu.Item
                      as='a'
                      icon
                      className={page === pages-1 ? 'pageDisabled' : ''}
                      onClick={() => this.changePage(page+1)}            
                    >
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    )
  }
}
