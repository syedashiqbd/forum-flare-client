import {
  FaBullhorn,
  FaCommentSlash,
  FaHome,
  FaList,
  FaPenSquare,
  FaUserAlt,
  FaUsers,
} from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logout();
    toast.success('Successfully logged-out', {
      style: {
        background: '#5F2DED',
        color: 'white',
      },
    });
  };

  return (
    <div className=" mx-auto">
      {/* <Navbar></Navbar> */}
      <div className="grid grid-cols-12">
        {/* dashboard sidebar */}
        <div className=" col-span-3 min-h-screen bg-[#F96E46] py-10 px-10">
          <img
            className="lg:w-40 w-16 mx-auto"
            src="https://i.ibb.co/NYkqWWs/Forum-flare.png"
          />
          <ul className="menu space-y-2 mt-5 lg:text-base">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminProfile">
                    <FaUserAlt></FaUserAlt>
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUser">
                    <FaUsers></FaUsers>
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reportedComment">
                    <FaCommentSlash />
                    Reported Comment
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/announcement">
                    <FaBullhorn></FaBullhorn>
                    Announcement
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {' '}
                <li>
                  <NavLink to="/dashboard/myProfile">
                    <FaUserAlt></FaUserAlt>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addPost">
                    <FaPenSquare></FaPenSquare>
                    Add Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myPost">
                    <FaList></FaList>
                    My Post
                  </NavLink>
                </li>{' '}
              </>
            )}

            {/* shared common */}
            <span className=" divider"></span>
            <div className="flex justify-between flex-col  font-bold ">
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>
                  Home
                </NavLink>
              </li>
              <li className="fixed bottom-0">
                <Link onClick={handleLogOut}>
                  <LuLogOut></LuLogOut>
                  Logout
                </Link>
              </li>
            </div>
          </ul>
        </div>

        {/* dashboard content */}
        <div className=" col-span-9 m-10 w-10/12">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
