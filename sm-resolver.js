/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Fragment } from 'react';

import { Slices as EssentialSlices } from 'essential-slices';

import * as Slices from './slices';

const __allSlices = { ...EssentialSlices, ...Slices };

const NotFound = ({ sliceName, slice, i }) => {
  console.error(`[sm-resolver] component "${sliceName}" not found at index ${i}.`);
  console.warn(`slice data: ${slice}`);
  return process.env.NODE_ENV !== 'production' ? (
    <div
      style={{
        height: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        background: '#FAFAFA',
      }}
    >
      <h2>
        Slice "
        {sliceName}
        " not found.
      </h2>
      <p style={{ maxWidth: '320px', fontSize: '16px' }}>
        Check that you registered this component in your slices library!
      </p>
    </div>
  ) : (
    <></>
  );
};

export default function SliceResolver({ sliceName, ...rest }) {
  return __allSlices[sliceName]
    ? __allSlices[sliceName]
    : () => <NotFound sliceName={sliceName} {...rest} />;
}
