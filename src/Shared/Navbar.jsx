// import { useContext } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';
import userDefaultPic from '../assets/user.png';
import { FaBullhorn } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: announcement } = useQuery({
    queryKey: ['announcement'],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcement');
      return res.data;
    },
  });

  const handleLogOut = () => {
    logout();
    toast.success('Successfully logged-out', {
      style: {
        background: '#5F2DED',
        color: 'white',
      },
    });
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'bg-primary text-white lg:py-1.5 lg:px-3 px-5 py-1 text-sm lg:text-base rounded  '
            : 'active text-[#F2277E] font-bold '
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/membership"
        className={({ isActive }) =>
          isActive
            ? 'bg-primary text-white lg:py-1.5 lg:px-3 px-5 py-1 text-sm lg:text-base rounded  '
            : 'active text-[#F2277E] font-bold '
        }
      >
        Membership
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? 'bg-primary text-white lg:py-1.5 lg:px-3 px-5 py-1 text-sm lg:text-base rounded  '
            : 'active text-[#F2277E] font-bold '
        }
      >
        Dashboard
      </NavLink>
      <div className="mr-5 flex items-center justify-center gap-2 bg-gray-200 p-2.5 rounded text-white">
        <FaBullhorn className="text-black"></FaBullhorn>
        <div className="badge badge-secondary">{announcement?.length}</div>
      </div>
    </>
  );

  return (
    <div className="w-full   ">
      <div className=" navbar max-w-[1280px]  mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content lg:mt-3 z-[1] p-2 shadow bg-base-100 lg:rounded-box rounded lg:w-52 w-28 flex lg:gap-6 gap-3 text-base items-center  justify-center"
            >
              {navLinks}
            </ul>
          </div>
          <img
            className="lg:w-28 w-16"
            src="https://i.ibb.co/NYkqWWs/Forum-flare.png"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-6 text-base items-center  justify-center">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img className="rounded-full" src={user.photoURL} />
                  ) : (
                    <img src={userDefaultPic} />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2"
              >
                <p className="font-bold text-center border-b-2 pb-2">
                  {user?.displayName}
                </p>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/membership">Membership</Link>
                </li>
                <li>
                  <p
                    onClick={handleLogOut}
                    className=" bg-primary text-white py-2 hover:bg-rose-700 hover:text-white focus:outline-none focus:ring active:text-rose-500 "
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="rounded bg-primary text-white lg:px-8 lg:py-2 px-6 py-1 hover:bg-rose-700 focus:outline-none focus:ring active:text-rose-500">
                Join Us
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
