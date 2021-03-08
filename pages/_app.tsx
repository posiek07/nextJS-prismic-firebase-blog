/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';

import { theme } from 'essential-slices';
import { AppProps } from 'next/app';
import '../styles/main.css';
import { ThemeProvider, BaseStyles } from 'theme-ui';

import { AuthProvider } from '../hooks/useAuth';

// eslint-disable-next-line react/jsx-props-no-spreading

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  </AuthProvider>
);

export default MyApp;
