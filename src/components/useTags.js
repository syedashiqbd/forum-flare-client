import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const useTags = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tags');
      return res.data;
    },
  });
  return tags;
};
