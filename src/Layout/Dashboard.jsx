import {
  FaBullhorn,
  FaCommentSlash,
  FaHome,
  FaList,
  FaPenSquare,
  FaUserAlt,
  FaUsers,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
 
  const [isAdmin] = useAdmin();

  return (
    <div className="max-w-[1280px] mx-auto">
      {/* <Navbar></Navbar> */}
      <div className="flex ">
        {/* dashboard sidebar */}
        <div className="w-72 min-h-screen bg-[#F96E46] py-10 px-5">
          <h1 className="text-center text-white font-bold text-4xl">
            Forum Flare
          </h1>
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
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        {/* dashboard content */}
        <div className="flex-1 p-10 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
