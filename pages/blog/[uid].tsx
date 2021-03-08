/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import SliceZone from 'next-slicezone';
import { useGetStaticProps, useGetStaticPaths } from 'next-slicezone/hooks';

import { Meta } from '../../layout/Meta';
import { Client } from '../../prismic';
import resolver from '../../sm-resolver';
import { Main } from '../../templates/Main';

const Page = (props) => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <div className="flex"><SliceZone {...props} resolver={resolver} /></div>
  </Main>
);

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: 'blog-page',
  uid: ({ params }) => params.uid,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: 'blog-page',
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { uid } }),
});

export default Page;
