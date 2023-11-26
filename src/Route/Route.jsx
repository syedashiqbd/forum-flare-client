import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Login from '../Pages/Login/Login';
import PostDetails from '../Pages/PostDetails/PostDetails';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import PrivateRoute from './PrivateRoute';
import Membership from '../Pages/Membership/Membership';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>,
      },
      {
        path: '/postDetails/:id',
        element: <PostDetails></PostDetails>,
        loader: async ({ params }) => {
          try {
            const response = await useAxiosSecure().get(
              `/postDetails/${params.id}`
            );
            return response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
        },
      },
      {
        path: 'membership',
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
