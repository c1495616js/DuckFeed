import React, { Component } from 'react'
import { Icon, Table, Menu } from 'semantic-ui-react'

export default class DataTable extends Component {
  render() {
    
    return (
      <div>
      <Table celled structured>
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
          <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alpha Team</Table.Cell>
          <Table.Cell>Project 1</Table.Cell>
          <Table.Cell textAlign='right'>2</Table.Cell>
          <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' size='large' />
          </Table.Cell>
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
        <Table.Row>
          <Table.Cell rowSpan='3'>Beta Team</Table.Cell>
          <Table.Cell>Project 1</Table.Cell>
          <Table.Cell textAlign='right'>52</Table.Cell>
          <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' size='large' />
          </Table.Cell>
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
        <Table.Row>
          <Table.Cell>Project 2</Table.Cell>
          <Table.Cell textAlign='right'>12</Table.Cell>
          <Table.Cell />
          <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' size='large' />
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
        <Table.Row>
          <Table.Cell>Project 3</Table.Cell>
          <Table.Cell textAlign='right'>21</Table.Cell>
          <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' size='large' />
          </Table.Cell>
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
      </Table.Body>

      { /* footer */}

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
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
