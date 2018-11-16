import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';

import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';

const initFeedState = {
  /// basic
  park: 'Test Park',  
  time: moment().format('DD/MM/YYYY HH:mm'),
  numbers: 5,
  // food
  name: 'food name',
  kind: 'food kind',
  amount: 2.5,
}
class FeedPanel extends Component {
  state = {
    
    user: this.props.currentUser,
    channels: [],
    ...Object.assign({}, initFeedState),
    modal: false,
    firstLoad: true
  }

  componentDidMount(){
    this.addListeners()
  }

  componentWillUnmount(){
    this.removeListeners()
  }

  addListeners = () => {
    
  }

  removeListeners = () => {
    
  }

  addFeed = () => {
    const { park, time, numbers, name, kind, amount, user } = this.state;
    
    const newFeed = {
      park,
      time: moment(time, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
      numbers,
      name,
      kind,
      amount,
      user_id: user.id
    }
   
    axios.post('http://localhost:8000/index.php/api/add_feed',
      qs.stringify(newFeed)
    ).then(()=>{
          this.setState(Object.assign({}, initFeedState));
          this.closeModal();
          console.log('feed added')
        })
    .catch( err =>{
      console.error(err);
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormValid(this.state)){
      console.log('feed added');
      this.addFeed();
    }
  }

  // input change
  handleChange = event => {    
    this.setState({[event.target.name]: event.target.value});
  }

  handleTimeChange = (event, {name, value}) => {
    console.log(name)
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }


  // valify form
  isFormValid = ({ park, time, numbers, name, kind, amount }) => park && time && numbers && name && kind && amount;

  // open the modal
  opneModal = () => {
    this.setState({modal: true})
  }

  // close the modal
  closeModal = () => {
    this.setState({modal: false})
  }

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }} >
          <Menu.Item>
            <span>
              <Icon name="cloud upload" /> Feeds
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.opneModal}/>
          </Menu.Item>          
        </Menu.Menu> 
        
        {/* Add Channel Modal */}

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header><Icon name="paw" /> Add Feed</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Icon name="book" /><p style={{display:'inline-block'}}>Basic Information</p>
              <Form.Field>
                <Input 
                  fluid
                  label="Park Name"
                  name="park"
                  value={this.state.park}
                  onChange={this.handleChange}
                />                
              </Form.Field>

              <Form.Field>
                <DateTimeInput
                  name="time"
                  placeholder="Date Time"
                  value={this.state.time}
                  iconPosition="left"
                  closeOnMouseLeave={false}
                  onChange={this.handleTimeChange} 
                />
                           
              </Form.Field>

              <Form.Field>
                <Input               
                  fluid
                  type="number"
                  label="Numbers"
                  name="numbers"
                  value={this.state.numbers}                  
                  onChange={this.handleChange}
                />                
              </Form.Field>

              <Icon name="food" /><p style={{display:'inline-block'}}>Food Information</p>
              <Form.Field>
                <Input 
                  fluid
                  label="Food Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />                
              </Form.Field>

              <Form.Field>
                <Input 
                  fluid
                  label="Food Kind"
                  name="kind"
                  value={this.state.kind}
                  onChange={this.handleChange}
                />                
              </Form.Field>

              <Form.Field>
                <Input 
                  fluid
                  label="Food Amount"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                />                
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>

            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect()(FeedPanel)