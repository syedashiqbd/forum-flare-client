import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Login from '../Pages/Login/Login';
import PostDetails from '../Pages/PostDetails/PostDetails';
import PrivateRoute from './PrivateRoute';
import Membership from '../Pages/Membership/Membership';
import Payment from '../Pages/Payment/Payment';
import Dashboard from '../Layout/Dashboard';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';
import AddPost from '../Pages/Dashboard/AddPost/AddPost';
import MyPost from '../Pages/Dashboard/MyPost/MyPost';
import CommentDetails from '../components/CommentDetails';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUsers';
import AdminRoute from './AdminRoute';
import Announcement from '../Pages/Dashboard/Announcement/Announcement';

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
        path: 'payment',
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: '/postDetails/:id',
        element: <PostDetails></PostDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/postDetails/${params.id}`),
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
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // normal user route
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>,
      },
      {
        path: 'addPost',
        element: <AddPost></AddPost>,
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>,
      },
      {
        path: 'myPost/comment/:id',
        element: <CommentDetails></CommentDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/comment/${params.id}`),
      },

      //admin route
      {
        path: 'manageUser',
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: 'announcement',
        element: (
          <AdminRoute>
            <Announcement></Announcement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
