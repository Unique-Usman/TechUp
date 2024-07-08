import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import ErrorFallback from './ui/ErrorFallback';
import PersistLogin from './features/authentication/PersistLogin';
import Spinner from './ui/Spinner';
import { FullPage } from './ui/FullPage';
import JobCardComponent from './ui/Job';
import { DarkModeProvider } from "./context/DarkModeContext";

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));
const Users = lazy(() => import('./pages/Users'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));


const router = createBrowserRouter([
  {
    element: <PersistLogin/>, 
    errorElement: <ErrorFallback/>,
    children: [
      {
        element: 
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path: "/account",
            element: <Account/>
          }
        ],
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/job",
        element: <JobCardComponent/>
      },
      {
        path: "/signup",
        element: <Users/> 
      },
      {
        path: "*",
        element: <PageNotFound/>
      }
    ]
  },
])



function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles/>
        <Suspense fallback={<FullPage><Spinner /></FullPage>}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-zinc-0)",
              color: "var(--color-zinc-700)",
            },
          }}
        />
      </DarkModeProvider>
    </>
  )
}

export default App;
