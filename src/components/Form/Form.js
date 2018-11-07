import React from 'react';

export const FormLegend = ({ formType }) => {
  return (
    <React.Fragment>
      <legend className="f1 fw6 ph0 mh0">
        {formType === 'signin' ? 'Sign In' : 'Register'}
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


export const Submit = ({ }) => {
  return (
    <div>
      <input
        onClick={this.onSubmitSignIn}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value="Register" />
    </div>
  )
};

export const Form = ({ inputType }) => {

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset
            id="sign_up"
            className="ba b--transparent ph0 mh0">
            {props.children}





          </fieldset>

          <div>
            <input
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register" />
          </div>

        </div>
      </main>
    </article>


  )
};