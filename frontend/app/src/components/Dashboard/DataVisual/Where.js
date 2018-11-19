import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';

import Api from '../../../Api';
import qs from 'qs';

const changeData = (d) => {
  const labels = d.map( r => r.park);
  const data = d.map( r => parseFloat(r.total_numbers));
  const allNumbers = data.reduce((sum, r) => sum + r);
  return {
    labels,
    datasets: [
      {
        label: `Where: Total ${allNumbers} ducks`,
        backgroundColor: 'rgba(155, 89, 182,0.2)',
        borderColor: 'rgba(155, 89, 182,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(155, 89, 182,0.4)',
        hoverBorderColor: 'rgba(155, 89, 182,1)',
        data
      }
    ]
  }
}
class Where extends Component {

  state = {
    data:{}
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps({ search }) {
    const p = { 
      search_park: JSON.stringify(search.park),
      search_food: JSON.stringify(search.name),
      search_kind: JSON.stringify(search.kind)
    };
    this.fetchData(p);
  }

  fetchData = (p = {}) => {
    Api.post('feed/list_feed',
      qs.stringify({...p, page_disabled:true, where: true})
    ).then(r => r.data)
    .then(({list}) => {
      if(list.length > 0){
        this.setState({data: changeData(list)})      
      }else{
        this.setState({data: {}})
      }      
    })
    .catch( err =>{
      console.error(err);
    })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <h2>What Park</h2>
        <HorizontalBar data={data} />
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

export default connect(mapStateToProps)(Where);
