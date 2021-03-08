import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';

const section = {
  maxWidth: '600px',
  margin: '4em auto',
  textAlign: 'center',
};


const MySlice = ({ slice }) => (
  <section style={section}>
    {slice.primary.bgImage
          ? <img className="shadow rounded max-w-full h-auto align-middle border-none" src={slice.primary.bgImage.url} alt={slice.primary.bgImage.alt} />
          : <img className="shadow rounded max-w-full h-auto align-middle border-none" src={slice.primary.bgImage.url} alt={slice.primary.bgImage.alt} />}
    {
      slice.primary.title ?
      <RichText render={slice.primary.title}/>
      : <h2>Template slice, update me!</h2>
    }
    {
      slice.primary.description ?
      <RichText render={slice.primary.description}/>
      : <p>start by editing this slice from inside the SliceMachine builder!</p>
    }
  </section>
);

MySlice.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MySlice;
