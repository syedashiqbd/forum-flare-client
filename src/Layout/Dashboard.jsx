import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaPenNib,
  FaPenSquare,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUtensils,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex ">
        {/* dashboard sidebar */}
        <div className="w-64 min-h-screen bg-[#F96E46] py-10 px-5">
          <h1 className="text-center text-white font-bold text-4xl">
            Forum Flare
          </h1>
          <ul className="menu space-y-2 mt-5 lg:text-base">
            {/* {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    <FaUtensils></FaUtensils>
                    Add Item
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    <FaList></FaList>
                    Manage Item
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaBook></FaBook>
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUser></FaUser>
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome></FaHome>
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reservation">
                    <FaCalendar></FaCalendar>
                    Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cart">
                    <FaShoppingCart></FaShoppingCart>
                    My Cart ({cart.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/adReview">
                    <FaAd></FaAd>
                    Ad Review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <FaList></FaList>
                    Payment History
                  </NavLink>
                </li>{' '}
              </>
            )} */}
            <li>
              <NavLink to="/dashboard/myProfile">
                <FaUser></FaUser>
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
            </li>

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
