/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import SliceZone from 'next-slicezone';
import { useGetStaticProps } from 'next-slicezone/hooks';
// import Link from 'next/link';
// import { RichText } from 'prismic-reactjs';

import { Meta } from '../layout/Meta';
import { Client } from '../prismic';
import resolver from '../sm-resolver.js';
import { Main } from '../templates/Main';

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: 'asd',
  queryType: 'single',
});

const Index = (props) => (
  <Main meta={<Meta title="NextJS Prismic Sockbutler Home" description="Sockbutler Home page" />}>
    <div className="flex">
      <SliceZone {...props} resolver={resolver} />
    </div>
  </Main>
);

export default Index;
