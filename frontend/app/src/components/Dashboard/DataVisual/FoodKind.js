import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

import Api from '../../../Api';
import qs from 'qs';

const changeData = (d) => {  
  const labels = d.map( r => r.kind);
  const data = d.map( r => parseFloat(r.total_amount));
  const allAmount = data.reduce((sum, r) => sum + r);
  return {
    labels,
    datasets: [
      {
        label: `What Kind of Food: Total ${allAmount} kg`,
        backgroundColor: 'rgba(46, 204, 113,0.2)',
        borderColor: 'rgba(46, 204, 113,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(46, 204, 113,0.4)',
        hoverBorderColor: 'rgba(46, 204, 113,1)',
        data
      }
    ]
  }
}
export default class FoodKind extends Component {

  state = {
    data:{}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Api.post('feed/list_feed',
      qs.stringify({page_disabled:true, kind_food: true})
    ).then(r => r.data)
    .then(({list}) => {              
      this.setState({data: changeData(list)})      
    })
    .catch( err =>{
      console.error(err);
    })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <h2>What Kind of Food</h2>
        <HorizontalBar data={data} />
      </div>
    )
  }
}
