import Banner from './Banner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';
import { useTags } from '../../components/useTags';
import AnouncementCard from '../../components/AnouncementCard';

const Home = () => {
  const [search, setSearch] = useState('');
  const [searchPosts, setSearchPosts] = useState([]);
  const [sortingType, setSortingType] = useState('regular');

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const axiosPublic = useAxiosPublic();

  // for loading all posts initially
  const { data: initialPosts, isLoading } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  // for loading announcement
  const { data: announcement = [] } = useQuery({
    queryKey: ['announcement'],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcement');
      return res.data;
    },
  });

  // for loading post by searching
  const handleSearchTag = (searchValue) => {
    setSearch(searchValue);
  };

  useEffect(() => {
    const handleSearchTag = () => {
      axiosPublic
        .get(`/posts?tag=${search}&page=${page}&limit=${limit}`)
        .then((res) => {
          setSearchPosts(res.data);
        })
        .catch((error) => console.log(error));
    };
    if (search) {
      handleSearchTag();
    }
  }, [axiosPublic, page, limit, search]);

  // all tags fetching
  const tags = useTags();

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

  const totalPost =
    searchPosts?.length > 0 ? searchPosts?.totalPost : initialPosts?.totalPost;

  // console.log(initialPosts, totalPost);

  const totalCount = Math.ceil(totalPost / limit);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalCount - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="bg-[url('/img/hero-pattern.svg')] -mt-32 ">
        <Banner handleSearchTag={handleSearchTag}></Banner>
      </div>
      <div className="lg:max-w-[1280px] md:max-w-[700px] max-w-[375px] mx-auto">
        {/* Tag collection */}
        <div className="border  rounded mt-10 grid grid-cols-12">
          <div className="lg:col-span-1 col-span-3 bg-primary rounded-l text-white lg:p-3 mr-2 flex items-center justify-center">
            <p>All Tags</p>
          </div>
          <div className="lg:col-span-11 col-span-9 flex lg:gap-7 gap-3 flex-wrap items-center ">
            {tags?.map((tag) => (
              <p className="text-primary font-semibold " key={tag._id}>
                {tag.tagName}
              </p>
            ))}
          </div>
        </div>

        {announcement?.length ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
            {announcement?.map((item) => (
              <AnouncementCard
                key={item._id}
                announcement={item}
              ></AnouncementCard>
            ))}
          </div>
        ) : (
          ''
        )}

        <div className="my-8 text-right ">
          <button
            onClick={handleSortByPopular}
            className="btn btn-sm btn-outline"
          >
            Sort by {sortingType === 'popular' ? 'Regular' : 'Popular'} Post
          </button>
        </div>

        {/* All post */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">
          {allPosts?.map((post) => (
            <PostCard key={post._id} post={post}></PostCard>
          ))}
        </div>

        {/* Pagination */}
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="join my-6 flex justify-center">
            <button
              onClick={handlePrevious}
              className="join-item bg-primary btn text-white w-20 hover:bg-[#F2277E]"
            >
              Prev
            </button>
            {[...Array(totalCount).keys()].map((item, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(item)}
                  className={`join-item btn text-white hover:bg-[#F2277E] w-20 ${
                    item === page ? 'bg-[#F2277E]' : 'bg-primary'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={handleNext}
              className="join-item bg-primary btn text-white w-20 hover:bg-[#F2277E]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
