/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { RichText } from 'prismic-reactjs';
import { array, shape } from 'prop-types';

const section = {
  maxWidth: '600px',
  margin: '4em auto',
  textAlign: 'center',
};

const h2 = {
  color: '#8592e0',
};

const MySlice = ({ slice }) => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-100 px-4">
        {
      slice.primary.title
        ? <RichText render={slice.primary.title} />
        : <h2>Template slice, update me!</h2>
    }
        {
      slice.primary.description
        ? <RichText render={slice.primary.description} />
        : <p>start by editing this slice from inside the SliceMachine builder!</p>
      }
        {slice.primary.imageId
          ? <img className="shadow rounded max-w-full h-auto align-middle border-none" src={slice.primary.imageId.url} alt={slice.primary.imageId.alt} />
          : <img className="shadow rounded max-w-full h-auto align-middle border-none" src={slice.primary.imageId.url} alt={slice.primary.imageId.alt} />}

      </div>

    </div>
  );
};

MySlice.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MySlice;
