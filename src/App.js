import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

// Created const to hide API KEy
const API_KEY = `${process.env.REACT_APP_CLARIFAI_API_KEY}`;

const app = new Clarifai.App({
  apiKey: `${API_KEY}`
});

// Customized particle options
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }

};

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }
};

// set initial state
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box:[],
      route: 'signin',
      isSignedIn: false
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    }
  )
  };


  calculateFaceLocation = (data) => {
    // retrieves bounding box data for four corner around face
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    // retrieves width of image
    const width = Number(image.width);
    // retrieves height of image
    const height = Number(image.height);
    // returns the values of the bounding box data
    // so that it may be used to create border box around face
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };


  displayFaceBox = (box) => {
    this.setState({ box });
  };

  // update input state to be used by Clarifai's FACE DETECT MODEL
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  };

  onButtonSubmit = () => {
    // set imageURL state to input in order to be
    // used as props for FaceRecognition/ be displayed
    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // retrieves the bounding_box data in order to create
    // square around the detected face
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    /*

     */
    if (route === 'signout') {
      this.setState({initialState})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route});
  };

  render() {
    // destructuring state
    const { isSignedIn, imageURL, route, box } = this.state;

    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {/*
          used a ternary expression in order to
          conditionally render route based on the current state
         */}
        {route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                box={box}
                imageURL={imageURL}/>}
            </div>
          : (
            // using js expression to pass another ternary operator
            // to conditionally render signin/register components
            route === 'signin'
              ? <SignIn
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              : <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />

            )
        }
      </div>
    );
  }
}

export default App;
