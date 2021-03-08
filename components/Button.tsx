import React from 'react';

import Spinner from '../icons/spinner';

interface ButtonProps {
  title?: string;
  isLoading?: boolean;
  children?: any;
}

const Button = ({
  isLoading,
  title,
  ...buttonProps
}: ButtonProps &
React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => (
  <button
    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...buttonProps}
    type="submit"
  >
    {isLoading ? (
      <Spinner width="20" fill="white" className="animate-spin" />
    ) : (
      title
    )}
  </button>
);
export default Button;
