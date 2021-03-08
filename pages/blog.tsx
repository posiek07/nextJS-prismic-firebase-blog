/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

import SliceZone from 'next-slicezone';
import Prismic from 'prismic-javascript';

import Card from '../components/Card';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { Meta } from '../layout/Meta';
import { Client } from '../prismic';
import resolver from '../sm-resolver.js';
import { Main } from '../templates/Main';

export async function getServerSideProps() {
  const client = Client();

  const posts = await client.query(
    Prismic.Predicates.at('document.type', 'blog-page'),
    { orderings: '[my.post.date desc]' },
  );
  return {
    props: {
      posts,
    },
  };
}

const Blog: React.FC = ({ posts }) => {
  const auth = useRequireAuth();
  return (
    <Main meta={<Meta title="Blog" description="Lorem ipsum" />}>

      <div>
        {posts && posts.results.map((post) => (
          <Card
            title={post.data.body[0].primary.title[0].text}
            description={post.data.body[0].primary.description[0].text}
            bgImage={post.data.body[0].primary.bgImage.url}
            uid={post.uid}
          />
        ))}
      </div>
    </Main>
  );
};

export default Blog;
