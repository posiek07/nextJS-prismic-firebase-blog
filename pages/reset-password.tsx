import React from 'react';

import Link from 'next/link';

import ResetPasswordForm from '../components/ResetPasswordForm';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const ResetPasswordPage: React.FC = () => (
  <Main meta={<Meta title="Sign up" description="Sign up" />}>
    <div className="min-h-screen flex flex-col">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Reset password
          </h2>
          <p className="mt-2 text-center text-md">
            {"Didn't forgot? "}
            <Link href="/login">
              <a href="#" className="text-blue-500">
                Login
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm />
        </div>
      </div>
    </div>

  </Main>
);
export default ResetPasswordPage;
