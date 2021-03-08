import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://repotestrepo.cdn.prismic.io/api/v2';

export const accessToken = '';

export const linkResolver = (doc) => {
  if (doc.type === 'post') {
    return `/blog/${doc.uid}`;
  }
  return '/';
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === 'post') {
    return `/post?uid=${doc.uid}`;
  }
  return '/';
};

// -- Client method to query Prismic
// Connects to the given repository to facilitate data queries
export const client = Prismic.client(apiEndpoint, { accessToken });
