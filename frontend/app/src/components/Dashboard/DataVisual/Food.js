import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

import axios from 'axios';
import qs from 'qs';

const changeData = (d) => {  
  const labels = d.map( r => r.name);
  const data = d.map( r => parseFloat(r.total_amount));
  const allAmount = data.reduce((sum, r) => sum + r);
  return {
    labels,
    datasets: [
      {
        label: `What Food: Total ${allAmount} kg`,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data
      }
    ]
  }
}
export default class Food extends Component {

  state = {
    data:{}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
      qs.stringify({page_disabled:true, what_food: true})
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
        <HorizontalBar data={data} />
      </div>
    )
  }
}
