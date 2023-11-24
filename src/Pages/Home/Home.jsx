import Banner from './Banner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const [searchPosts, setSearchPosts] = useState([]);

  const axiosPublic = useAxiosPublic();

  // for initial loading all posts
  const { data: initialPosts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/posts');
      return res.data;
    },
  });

  const allPosts = searchPosts.length > 0 ? searchPosts : initialPosts;

  if (isLoading) return <h1 className="text-center">Loading...</h1>;

  console.log(allPosts);

  // for searching post
  const handleSearchTag = (search) => {
    axiosPublic
      .get(`/posts?tag=${search}`)
      .then((res) => {
        setSearchPosts(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="bg-red-300">
        <Banner handleSearchTag={handleSearchTag}></Banner>
      </div>

    </div>
  );
};
export default Home;
