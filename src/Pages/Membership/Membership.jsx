import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Membership = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(users.badge);

  return (
    <div className="lg:max-w-[1280px] md:max-w-[700px] max-w-[375px] mx-auto  mt-10 mb-20">
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl lg:w-9/12 mx-auto border border-gray-100">
          <img
            src="https://i.ibb.co/6nvbMcL/Gold-Membership.png"
            className="w-32 absolute -top-8 -right-8 rotate-45"
          />
          <figure className="lg:w-5/12 lg:h-full h-52">
            <img
              src="https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Payment"
              className="object-cover h-full w-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-none "
            />
          </figure>
          <div className="card-body lg:w-7/12 relative">
            <h2 className="card-title lg:text-4xl text-2xl mb-5 font-bold z-10 text-[#F2277E]">
              Become A Gold Member
            </h2>
            <p>
              A membership in our forum unlocks a multitude of exclusive
              benefits designed to enhance your overall experience within the
              community. As a member, you gain privileged access to premium
              content, enjoying an ad-free environment for undisturbed
              engagement. Be at the forefront of innovation with early access to
              new features and updates, providing you with a sneak peek into the
              future of our platform.
            </p>
            <ul className="flex-grow mt-5">
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Life Time Access
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Member Badge/Icon
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Exclusive Content Access
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Ad-Free Experience
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Special Announcements
              </li>
            </ul>
            <div className="card-actions justify-between items-center mt-10">
              <h1 className="text-3xl font-bold">
                $<span className="text-success text-6xl">125</span>
              </h1>
              {users?.badge === 'bronze' ? (
                <Link to="/payment">
                  <button className="btn btn-primary  rounded">Pay Now</button>
                </Link>
              ) : (
                <button className="btn btn-success text-white  rounded">
                  You Already <br /> Gold Member
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Membership;
