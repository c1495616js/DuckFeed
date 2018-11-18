import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

import axios from 'axios';
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
export default class Where extends Component {

  state = {
    data:{}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
      qs.stringify({page_disabled:true, where: true})
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
        <h2>What Park</h2>
        <HorizontalBar data={data} />
      </div>
    )
  }
}
