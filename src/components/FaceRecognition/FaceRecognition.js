import React from 'react';

// destructure imageURL
const FaceRecognition = ({ imageURL }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={imageURL} alt='' width='500px' height='auto'/>
      </div>
    </div>
    
  )
};

export default FaceRecognition;
