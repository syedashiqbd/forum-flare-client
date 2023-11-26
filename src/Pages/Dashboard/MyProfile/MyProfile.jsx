import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import PostCard from '../../../components/PostCard';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: userDetails = [] } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  const { _id, name, email, badge, userPost } = userDetails;

  // for latest post finding
  const latestPosts = userPost?.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  return (
    <div className="text-center space-y-3">
      <div className="relative w-40 mx-auto mt-10">
        <img
          src={user.photoURL}
          className=" rounded-lg w-40 h-40 object-cover "
        />
        <div className="absolute -top-8 -right-8 rotate-45">
          {badge === 'bronze' ? (
            <img src="https://i.ibb.co/8mcvL7V/BRONZE.png" className="w-20" />
          ) : (
            <img
              src="https://i.ibb.co/6nvbMcL/Gold-Membership.png"
              className="w-20"
            />
          )}
        </div>
      </div>
      <h1 className="text-5xl font-bold  ">{user.displayName}</h1>
      <p className=" font-semibold  ">{email}</p>
      <div className="grid lg:grid-cols-2 gap-5 text-left">
        {latestPosts?.slice(0, 3).map((item) => (
          <PostCard key={item._id} post={item}></PostCard>
        ))}
      </div>
    </div>
  );
};
export default MyProfile;
