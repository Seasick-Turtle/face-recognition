import React, { Component } from 'react';
import {
  Form,
  FormLegend,
  Name,
  Email,
  Password,
  RegisterSubmit
} from '../Form/Form'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value});
  };

  onPasswordChange = (e) => {
    this.setState({password: e.target.value});
  };

  // send post request to register new user
  // if successful, send user to the home page
  onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');

        }
      });

  };


  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <Form>
              <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0">
                <FormLegend formType={''}/>
                <Name onNameChange={this.onNameChange}/>
                <Email onEmailChange={this.onEmailChange}/>
                <Password onPasswordChange={this.onPasswordChange}/>
              </fieldset>
              <RegisterSubmit onSubmitSignIn={this.onSubmitSignIn}/>
            </Form>
          </div>
        </main>
      </article>
    )
  }

};
