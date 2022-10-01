import React, { FC, ReactElement } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { NotificationContainer } from 'react-notifications';
import { Link, Route, Routes } from 'react-router-dom';

import { ErrorFallback, errorHandler } from '~/components/error-fallback.component';
import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

import { BlogList } from './blog/blog-list.component';
import { EditBlog } from './blog/edit-blog.component';
import { NewBlog } from './blog/new-blog.component';

import 'react-notifications/lib/notifications.css';

interface ButtonLinkProps {
  to: string;
  disabled?: boolean;
  children: ReactElement;
}

export const ButtonLink: FC<ButtonLinkProps> = ({ to, disabled, children }) => (
  <Link
    className="disbled:pointer-events-none rounded-md border-2 border-black bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700 active:bg-blue-300 active:text-black disabled:cursor-not-allowed disabled:opacity-75"
    disabled={disabled}
    to={to}
  >
    {children}
  </Link>
);

const App: FC = (): ReactElement => (
  <div className="flex min-h-screen flex-col">
    <Header />

    <main className="grow">
      <NotificationContainer />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={errorHandler}
        onReset={() => console.log('Resetting after error')}
      >
        <div className="flex">
          <BlogList className="" />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={errorHandler}
            onReset={() => console.log('Resetting after error')}
          >
            <Routes>
              <Route element={<EditBlog />} path=":id" />
              <Route element={<NewBlog />} path="/create" />
            </Routes>
          </ErrorBoundary>
        </div>
        <ButtonLink to="/create">
          <span>New Blog</span>
        </ButtonLink>
      </ErrorBoundary>
    </main>

    <Footer />
  </div>
);

export default App;
