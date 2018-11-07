import React from 'react';

export const FormLegend = ({ formType }) => {
  return (
    <React.Fragment>
      <legend className="f1 fw6 ph0 mh0">
        {formType === 'signIn' ? 'Sign In' : 'Register'}
      </legend>
    </React.Fragment>
    )
};

export const Name = ({ onNameChange }) => {
  return (
    <div className="mt3">
      <label
        className="db fw6 lh-copy f6"
        htmlFor="name">
        Name
      </label>
      <input
        onChange={onNameChange}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="text"
        name="name"
        id="name"
      />
    </div>
  )
};

export const Email = ({ onEmailChange }) => {
  return (
    <div className="mt3">
      <label
        className="db fw6 lh-copy f6"
        htmlFor="email-address">
        Email
      </label>
      <input
        onChange={onEmailChange}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email"
        name="email-address"
        id="email-address" />
    </div>
  )
};


export const Password = ({ onPasswordChange }) => {
  return (
    <div className="mv3">
      <label
        className="db fw6 lh-copy f6"
        htmlFor="password">
        Password
      </label>
      <input
        onChange={onPasswordChange}
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="password"
        name="password"
        id="password" />
    </div>
  )
};


export const RegisterSubmit = ({ onSubmitSignIn }) => {
  return (
    <div>
      <input
        onClick={onSubmitSignIn}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value="Register" />
    </div>
  )
};

export const SignInSubmit = ({ onSubmitSignIn, onRouteChange }) => {
  return (
    <React.Fragment>
      <div>
        <input
          onClick={onSubmitSignIn}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Sign in" />
      </div>
      <div className="lh-copy mt3">
        <p
          onClick={() => onRouteChange('register')}
          className="f6 link dim black db b pointer">
          Register
        </p>
      </div>
    </React.Fragment>
  )
};

export const Form = (props) => {

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
};