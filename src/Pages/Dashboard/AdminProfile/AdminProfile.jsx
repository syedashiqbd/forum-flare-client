import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiArticleFill } from 'react-icons/ri';
import { FaComment, FaUser } from 'react-icons/fa';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  console.log(stats);
  return (
    <div className="text-center ">
      <div className="relative w-40 mx-auto mt-10">
        <img
          src={user?.photoURL}
          className=" rounded-lg w-40 h-40 object-cover "
        />
      </div>
      <h1 className="text-5xl font-bold my-3  ">{user?.displayName}</h1>
      <p className=" font-semibold  ">{user?.email}</p>
      <div className="flex gap-6 justify-between mt-10 ">
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-purple-500 to-purple-100 py-4 pl-5 pr-10 ">
          <RiArticleFill className="text-5xl"></RiArticleFill>
          <div className="text-center">
            <h1 className="text-5xl font-bold">{stats?.posts}</h1>
            <p className="text-lg">Post</p>
          </div>
        </div>
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-amber-500 to-amber-100 py-4 pl-5 pr-10 ">
          <FaUser className="text-5xl"></FaUser>
          <div className="text-center">
            <h1 className="text-5xl font-bold"> {stats?.users}</h1>
            <p className="text-lg">User</p>
          </div>
        </div>
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-pink-500 to-pink-100 py-4 pl-5 pr-10 ">
          <FaComment className="text-5xl"></FaComment>
          <div className="text-center">
            <h1 className="text-5xl font-bold"> {stats?.comments}</h1>
            <p className="text-lg">Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfile;
