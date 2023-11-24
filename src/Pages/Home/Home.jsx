import Banner from './Banner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';

const Home = () => {
  const [searchPosts, setSearchPosts] = useState([]);
  const [sortingType, setSortingType] = useState('regular');

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

  // sorting type condition
  const allPosts =
    sortingType === 'popular'
      ? searchPosts?.popularPost?.length > 0
        ? searchPosts?.popularPost
        : initialPosts?.popularPost
      : searchPosts?.regularPost?.length > 0
      ? searchPosts?.regularPost
      : initialPosts?.regularPost;

  const handleSortByPopular = () => {
    setSortingType(sortingType === 'popular' ? 'regular' : 'popular');
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <div className="bg-red-300">
        <Banner handleSearchTag={handleSearchTag}></Banner>
      </div>
      <div className="lg:max-w-[1320px] md:max-w-[700px] max-w-[375px] mx-auto">
        {/* it will be from tag collection */}
        <div className="border  rounded mt-5 grid grid-cols-12">
          <div className="col-span-1 bg-primary rounded-l text-white p-3 mr-2">
            <p>All Tags</p>
          </div>
          <div className="col-span-11 flex gap-7 items-center ">
            {tags?.map((tag) => (
              <p className="text-primary font-semibold " key={tag._id}>
                {tag.tagName}
              </p>
            ))}
          </div>
        </div>
        {/* Post Section */}
        <div className="my-8 text-right ">
          <button onClick={handleSortByPopular} className="btn btn-outline">
            Sort by {sortingType === 'popular' ? 'Regular' : 'Popular'} Post
          </button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">
          {allPosts?.map((post) => (
            <PostCard key={post._id} post={post}></PostCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
