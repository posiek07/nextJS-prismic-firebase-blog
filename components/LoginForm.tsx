import React, { useState } from 'react';

import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAuth, UserSignIn } from '../hooks/useAuth';
import Button from './Button';

interface Error {
  message: string
}

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();
  const onSubmit = (data: UserSignIn) => {
    setIsLoading(true);
    setError(null);
    return auth.signIn(data).then((response: any) => {
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      response.error ? setError(response.error) : router.push('/dashboard');
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md">
        {error?.message && (
        <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
        )}
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="email"
            name="email"
            ref={register({
              required: 'Please enter an email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Not a valid email',
              },
            })}
          />
          {errors.email && (
          <div className="mt-2 text-xs text-red-600">
            {errors.email.message}
          </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="password"
            name="password"
            ref={register({
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters',
              },
            })}
          />
          {errors.password && (
          <div className="mt-2 text-xs text-red-600">
            {errors.password.message}
          </div>
          )}
          <div className="mt-4 flex items-end">
            <div className="text-sm leading-5">
              <Link href="/reset-password">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Login" type="submit" isLoading={isLoading} />
        </span>
      </div>
    </form>
  );
};
export default LoginForm;
