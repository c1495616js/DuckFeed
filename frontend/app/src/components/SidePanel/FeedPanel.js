import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';

import { Menu, Icon, Modal, Form, Input, Button, Label } from 'semantic-ui-react'
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
    feeds: [],
    ...Object.assign({}, initFeedState),
    modal: false,
    firstLoad: true
  }

  componentDidMount(){
    this.fetchMyFeeds()
  }


  fetchMyFeeds = () => {
    axios.post('http://localhost:8000/index.php/feed/list_feed',
      qs.stringify({page_disabled:true, user_id: this.state.user.id})
    ).then(r => r.data)
    .then(({ list })=>{
      this.setState({ feeds: list });          
    })
    .catch( err =>{
      console.error(err);
    })
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
          this.setState(Object.assign({}, initFeedState), this.fetchMyFeeds);
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
    const { feeds, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }} >
          <Menu.Item>
            <span>
              <Icon name="cloud upload" /> Feeds
            </span>{" "}
            ({feeds.length}) <Icon name="add" onClick={this.opneModal}/>
          </Menu.Item>          
        </Menu.Menu> 
        
        {/* Add Channel Modal */}

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header><Icon name="paw" /> Add Feed</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              
              <div style={{margin:'15px 0'}}>              
                <Label color='teal' tag>
                  <Icon name="book" /><span>Basic Information</span>
                </Label>
              </div>                 
            
              
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

              {/* */}

              <div style={{margin:'15px 0'}}>
                <Label  color='red' tag>
                <Icon name="food" /><span>Food Information</span>
                </Label>
              </div>   
              
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
                  label="Food Amount (kg)"
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
