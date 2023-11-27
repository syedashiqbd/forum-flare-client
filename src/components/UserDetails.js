import { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

export const UserDetails = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: userDetails = [], refetch } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  return { user, userDetails, refetch };
};
