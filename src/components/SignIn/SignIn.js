import React, { Component } from 'react';
import {
  Form,
  FormLegend,
  Email,
  Password,
  SignInSubmit
} from '../Form/Form';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({signInEmail: e.target.value})
  };

  onPasswordChange = (e) => {
    this.setState({signInPassword: e.target.value});
  };

  // send post request to verify users credentials
  // if successful, send user to the home page
  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <Form>
              <fieldset
              id="sign_up"
              className="ba b--transparent ph0 mh0">
                <FormLegend formType={'signIn'} />
                <Email onEmailChange={this.onEmailChange}/>
                <Password onPasswordChange={this.onPasswordChange}/>
            </fieldset>
              <SignInSubmit onSubmitSignIn={this.onSubmitSignIn} onRouteChange={onRouteChange}/>
            </Form>
          </div>
        </main>
      </article>
    )
  }

};
