import React from 'react';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,  
  MarkSeriesCanvas,
  Hint
} from 'react-vis';

const w=window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
width = w.innerWidth||e.clientWidth||g.clientWidth;


const changeData = (d) => {
  return d.map(r => {
    return {
      x: parseFloat(moment(r.time).format('HH')) + parseFloat(moment(r.time).format('mm'))/60,
      y: r.numbers,
      size: r.amount,
      color: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.5,
      Park: r.park,
      Date: moment(r.time).format('DD/MM/YYYY'),
      Time: moment(r.time).format('HH:mm'),
      Numbers: r.numbers,
      Food: r.name,
      Kind: r.kind,
      Amount: `${r.amount} kg`
    }
  })
}

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};


export default class DataPoints extends React.Component {
  state = {
    drawMode: 0,
    data: [],
    colorType: 'typeA',
    value: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
      qs.stringify({page_disabled: true})
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
    const {data, colorType} = this.state;

    const markSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      seriesId: 'my-example-scatterplot',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      data,
      onNearestXY: value => {        
        this.setState({
          value:{            
            Park: value.Park,
            Date: value.Date,
            Time: value.Time,
            Numbers: value.Numbers,
            Food: value.Food,
            Kind: value.Kind,
            Amount: value.Amount,
            x:value.x,
            y:value.y
          }
        })
      }
    };

    
    return (
      <div>
        <h2>Data Points</h2>
        <p><strong style={{color:'blue'}}>X-axis</strong>: Time(hour)</p>
        <p><strong style={{color:'red'}}>Y-axis</strong>: Number of ducks</p>
        <XYPlot
          onMouseLeave={() => this.setState({value: false})}
          width={width-350}
          height={300}
          xDomain={[0, 24]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {<MarkSeriesCanvas {...markSeriesProps} />}
          
          {this.state.value ? <Hint value={this.state.value} /> : null}
        </XYPlot>
      </div>
    );
  }
}
