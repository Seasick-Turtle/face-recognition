import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
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

// set initial state to be empty strings
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box:[]
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  displayFaceBox = (box) => {
    console.log(box);
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
    // retrieves the bounding_box information in order to create
    // square around the detected face
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          box={this.state.box}
          imageURL={this.state.imageURL}/>}
      </div>
    );
  }
}

export default App;
