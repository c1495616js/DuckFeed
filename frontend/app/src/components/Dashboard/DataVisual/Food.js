import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';


const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};


export default class Food extends Component {
  render() {
    return (
      <div>
      <Pie data={pie}/>
      </div>
    )
  }
}
