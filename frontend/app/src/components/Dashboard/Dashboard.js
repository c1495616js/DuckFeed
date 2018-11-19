import React, { Component } from 'react'
import DataTable from './DataTable';
import DataVisual from './DataVisual/DataVisual';
import Search from './Search'
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Search/>
        <DataVisual/>        
        <DataTable currentUser={this.props.currentUser}/>
      </div>
    )
  }
}
