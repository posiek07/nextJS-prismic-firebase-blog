import React, { ReactNode, Fragment } from 'react';

import { useColorMode } from 'theme-ui';

import Link from '../components/Link';
import { useAuth } from '../hooks/useAuth';
import { Config } from '../utils/Config';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const auth = useAuth();
  const [colorMode, setColorMode] = useColorMode();
  return (
    <div className="antialiased w-full text-gray-700">
      {props.meta}

      <div className="max-w-screen-md mx-auto">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="font-bold text-3xl text-gray-900">{Config.title}</div>
            <div className="text-xl">{Config.description}</div>
          </div>
          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link href="/">
                  <a className="text-gray-700 border-none hover:text-gray-900">Home</a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/blog">
                  <a className="text-gray-700 border-none hover:text-gray-900">Blog</a>
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li className="mr-6">
                    <Link href="/signup">
                      <a className="text-gray-700 border-none hover:text-gray-900">Sign up</a>
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link href="/login">
                      <a className="text-gray-700 border-none hover:text-gray-900">Login</a>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="mr-6">
                  <Link href="/dashboard">
                    <a className="text-gray-700 border-none hover:text-gray-900">Account</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="py-5 text-xl content">{props.children}</div>

        <div className="border-t border-gray-300 text-center py-8 text-sm">
          © Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          Daniel Smolinski
          {' '}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={() => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default');
            }}
          >
            Toggle
            {' '}
            {colorMode === 'default' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { Main };
