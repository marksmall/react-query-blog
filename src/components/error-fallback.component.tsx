import React, { FC, ReactElement } from 'react';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const errorHandler = (error: Error, info: { componentStack: string }) => {
  console.log('HERE IS THE ERROR: ', error);
  console.log('HERE IS THE INFO: ', info);
};

export const ErrorFallback: FC<Props> = ({ error, resetErrorBoundary }): ReactElement => {
  return (
    <div>
      <pre className="rounded-md border-2 border-gray-700 bg-gray-300 p-4 text-black">{error.message}</pre>

      <button
        className="rounded-md border-2 border-black bg-green-500 py-2 px-4 text-white"
        onClick={resetErrorBoundary}
      >
        Try to recover
      </button>
    </div>
  );
};
