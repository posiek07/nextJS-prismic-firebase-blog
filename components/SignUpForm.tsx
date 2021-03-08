import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { auth, db } from '../config/firebase';
import Button from './Button';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface Error {
  message: string
}

const SignUpForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm();

  const createUser = (user: { uid: string, email: string, name: string }) => db
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then(() => {
      console.log('Success');
    })
    .catch((err) => {
      console.log(err);
    });

  const signUp = ({ name, email, password }: SignUpData) => {
    setIsLoading(true);
    setError(null);
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => createUser({ uid: response.user!.uid, email, name }).then(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }))
      .catch((err) => setError(err.message));
  };

  const onSubmit = (data: SignUpData) => signUp(data).then((user) => {
    console.log(user);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        {error?.message && (
        <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
        )}
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name="name"
          ref={register({
            required: 'Please enter an name',
          })}
        />
        {errors.password && (
        <div className="mt-2 text-xs text-red-600">
          {errors.password.message}
        </div>
        )}
      </div>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Register" type="submit" isLoading={isLoading} />
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
