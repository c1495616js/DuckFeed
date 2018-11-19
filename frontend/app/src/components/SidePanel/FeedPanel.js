import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import Api from '../../Api';
import qs from 'qs';

import { Menu, Icon, Modal, Form, Input, Button, Label, Message } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';

const initFeedState = {
  /// basic
  park: '',  
  time: moment().format('DD/MM/YYYY HH:mm'),
  numbers: 1,
  // food
  name: '',
  kind: '',
  amount: 0,
}
class FeedPanel extends Component {
  state = {    
    user: this.props.currentUser,
    feeds: [],
    ...Object.assign({}, initFeedState),
    modal: false,    
    errors: [],
    loading: false
  }

  componentDidMount(){
    this.fetchMyFeeds()
  }


  fetchMyFeeds = () => {
    Api.post('feed/list_feed',
      qs.stringify({page_disabled:true, user_id: this.state.user.id})
    ).then(r => r.data)
    .then(({ list, error_code })=>{
      if(error_code === 'Authorization Error'){
        window.location.reload();        
        return;
      }
      console.log('list:', list)
      this.setState({ feeds: list });          
    })
    .catch( err =>{
      console.error(err);
    })
  }


  addFeed = () => {
    const { park, time, numbers, name, kind, amount, user } = this.state;
    
    const newFeed = {
      park: park.toLowerCase(),
      time: moment(time, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
      numbers,
      name: name.toLowerCase(),
      kind: kind.toLowerCase(),
      amount,
      user_id: user.id
    }
   
    Api.post('feed/add_feed',
      qs.stringify(newFeed)
    ).then(()=>{
          this.setState(
            {
            ...Object.assign({}, initFeedState),
            loading: false
            },
            this.fetchMyFeeds
          );
          this.closeModal();
          console.log('feed added')
        })
    .catch( err =>{
      console.error(err);
      this.setState({loading: false});
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if(!this.isFormValid()) return
    
    this.setState({ errors: [], loading: true}); 
    this.addFeed();
    
  }

  // errors
  isFormValid = () => {
    let errors = [];
    let error;

    if(this.isFormEmpty(this.state)){
      // throw errors
      error = {message: 'Fill in all fields'};
      this.setState({errors: errors.concat(error)})
      return false
    } else if(!this.isAmountValid(this.state)){
      // throw errors
      error = { message: 'Amount is float number and greater than zero'};
      this.setState({errors:errors.concat(error)});
    } else {
      return true;
    }
  }

isFormEmpty = ({ park, time, name, kind, amount }) => {  
  return !park.length || !time.length  || !name.length || !kind.length || !amount.length
}

isAmountValid = ({amount}) => {  
  return !isNaN(amount) && amount > 0;
}

  displayErrors = errors => errors.map((error, i)=> <p key={i}>{error.message}</p>);


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


  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  // open the modal
  opneModal = () => {
    this.setState({modal: true})
  }

  // close the modal
  closeModal = () => {
    this.setState({modal: false})
  }

  render() {
    const { feeds, modal, errors, loading } = this.state;

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
                  className={this.handleInputError(errors, "park")}
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
                  min="1"
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
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}
          </Modal.Content>

          <Modal.Actions>
            <Button 
              color="green" 
              inverted 
              onClick={this.handleSubmit}
              disabled={loading}
              className={loading ? "loading" : ""}
            >
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
