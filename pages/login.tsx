import React from 'react';

import Link from 'next/link';

import LoginForm from '../components/LoginForm';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const LoginPage: React.FC = () => (
  <Main meta={<Meta title="Sign up" description="Sign up" />}>
    <div className="min-h-screen flex flex-col">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold">Log in</h2>
          <p className="mt-2 text-center text-md">
            {"Don't have an account? "}
            <Link href="/signup">
              <a href="#" className="text-blue-500">
                Sign Up
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  </Main>
);
export default LoginPage;
