import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import Api from '../../Api';
import qs from 'qs';
import { Link } from 'react-router-dom';


export default class Login extends Component {
  state = {    
    email: '',
    password: '',    
    errors: [],
    loading: false,    
  };

  
  displayErrors = errors => errors.map((error, i)=> <p key={i}>{error.message}</p>);

  handleChange = event => {    
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    if(!this.isFormValid()) return
    this.setState({ errors: [], loading: true });
    Api.post(`users/login`,
      qs.stringify({email: this.state.email, password: this.state.password})
      )
      .then(r => r.data)
      .then(r => {              
        if(r.error_code){
          console.error(r.error_code);
          const err = {"message" : r.error_code.join()};

          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        }else{
          console.log('login succeed');
          localStorage.setItem('ACCESS_TOKEN', r.token);
          Api.defaults.headers.common['Authorization'] = r.token;
          this.setState({ loading: false });
          this.props.setUser(r.user);
          this.props.history.push('/');          
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        })
      }) 
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if(this.isFormEmpty(this.state)){
      // throw errors
      error = {message: 'Fill in all fields'};
      this.setState({errors: errors.concat(error)})
      return false
    } else {
      return true;
    }
  }

  isFormEmpty = ({ email, password}) => {
    return !email.length || !password.length;
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {    
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="yellow" textAlign="center">
            <Icon name="paw" color="yellow"/>
            Login to DuckFeed
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>              

              <Form.Input fluid name="email" icon="mail" iconPosition="left"
                className={this.handleInputError(errors, "email")}
                placeholder="Email Address" onChange={this.handleChange} value={email}  type="email"/>

              <Form.Input fluid name="password" icon="lock" iconPosition="left"
              className={this.handleInputError(errors, "password")}
              placeholder="Password" onChange={this.handleChange} value={password} type="password"/>

              

              <Button color="yellow" fluid size="large" disabled={loading}
              className={loading ? "loading" : ""}>Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Don't have an account? <Link to="/register" >Register</Link></Message>

        </Grid.Column>
      </Grid>
    )
  }
}
