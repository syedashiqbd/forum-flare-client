import Banner from './Banner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';

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

  // for searching post
  const handleSearchTag = (search) => {
    axiosPublic
      .get(`/posts?tag=${search}`)
      .then((res) => {
        setSearchPosts(res.data);
      })
      .catch((error) => console.log(error));
  };

  // for tag loading all posts
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tags');
      return res.data;
    },
  });

  const allPosts = searchPosts.length > 0 ? searchPosts : initialPosts;

  if (isLoading) return <Loading></Loading>;
  // console.log(allPosts);

  return (
    <div>
      <div className="bg-red-300">
        <Banner handleSearchTag={handleSearchTag}></Banner>
      </div>
      <div className="lg:max-w-[1320px] md:max-w-[700px] max-w-[375px] mx-auto">
        {/* it will be from tag collection */}
        <div className="border mt-5 rounded flex justify-around py-4 flex-wrap">
          {tags?.map((tag) => (
            <p className="text-primary font-semibold " key={tag._id}>
              {tag.tagName}
            </p>
          ))}
        </div>
        {/* Post Section */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
          {allPosts?.map((post) => (
            <PostCard key={post._id} post={post}></PostCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
