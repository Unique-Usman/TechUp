import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import Login from './pages/Login'; 

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
    </>
  )
}

export default App;
