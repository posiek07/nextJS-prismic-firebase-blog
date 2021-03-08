import React from 'react';

import Link from 'next/link';

import SignUpForm from '../components/SignUpForm';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const SignUpPage: React.FC = () => (
  <Main meta={<Meta title="Sign up" description="Sign up" />}>
    <div className="min-h-screen flex flex-col">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl leading-9 font-   extrabold">Sign up</h2>
          <p className="mt-2 text-center text-md ">
            already have an account?
            {' '}
            <Link href="/login">
              <a href="#" className="text-blue-500">Log in</a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  </Main>
);
export default SignUpPage;
