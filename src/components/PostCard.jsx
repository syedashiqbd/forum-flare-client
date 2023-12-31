import { FaComment, FaPen, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const {
    _id,
    authorName,
    authorPicture,
    title,
    description,
    tags,
    time,
    upvote,
    downvote,
    comment,
  } = post;
  return (
    <Link to={`/postDetails/${_id}`}>
      <div className="card min-w-96 min-h-[500px] bg-base-100 shadow-xl ">
        <figure>
          <img src={authorPicture} className="w-full h-56 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="font-bold flex items-center gap-2 text-primary">
            {authorName}
            <FaPen></FaPen>
          </p>
          <div className="flex">
            <p className="text-xs">{time.slice(0, 10)}</p>
            <div className="badge badge-secondary">{tags}</div>
          </div>
          <p className="my-5">{description.slice(0, 100)}....</p>
          <div className="card-actions justify-between">
            <p className="flex items-center gap-2 text-xl">
              <FaComment className="text-rose-600"></FaComment>
              {comment}
            </p>
            <div className="flex gap-3">
              <div className="badge badge-outline px-5 py-3 ">
                <FaThumbsUp className="mr-2 text-primary"></FaThumbsUp>
                {upvote}
              </div>
              <div className="badge badge-outline px-5 py-3 ">
                <FaThumbsDown className="mr-2 text-rose-600"></FaThumbsDown>
                {downvote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
