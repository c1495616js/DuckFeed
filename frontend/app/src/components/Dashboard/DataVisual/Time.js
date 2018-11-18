import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

import axios from 'axios';
import qs from 'qs';

const changeData = (d) => {
  const labels = d.map( r => r.what_time);
  const data = d.map( r => parseFloat(r.total_cnt));
  const allNumbers = data.reduce((sum, r) => sum + r);
  return {
    labels,
    datasets: [
      {
        label: `What Time: Total ${allNumbers}`,
        backgroundColor: 'rgba(52, 152, 219,0.2)',
        borderColor: 'rgba(52, 152, 219,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(52, 152, 219,0.4)',
        hoverBorderColor: 'rgba(52, 152, 219,1)',
        data
      }
    ]
  }
}
export default class Time extends Component {

  state = {
    data:{}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
      qs.stringify({page_disabled:true, what_time: true})
    ).then(r => r.data)
    .then(({list}) => {
      console.log(list);        
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
        <h2>What Time</h2>
        <HorizontalBar data={data} />
      </div>
    )
  }
}
