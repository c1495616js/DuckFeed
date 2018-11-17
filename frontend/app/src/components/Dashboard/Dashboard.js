import React, { Component } from 'react'
import DataTable from './DataTable';
import DataVisual from './DataVisual/DataVisual';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <DataVisual/>
        
        <DataTable currentUser={this.props.currentUser}/>
      </div>
    )
  }
}
