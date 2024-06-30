import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import Login from './pages/Login'; 
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Error/>,

    children: [
      {
        path: "/",
        element: <Home/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }

])


function App() {
  return (
    <>
      <GlobalStyles/>
      <RouterProvider router={router} />
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
    </>
  )
}

export default App;
