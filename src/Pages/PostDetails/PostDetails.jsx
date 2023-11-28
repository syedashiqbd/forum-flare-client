import { FaComment, FaPen, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

import './Demo.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import placeholder from '../../assets/user.png';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const PostDetails = () => {
  const post = useLoaderData();
  const {
    _id,
    authorName,
    authorPicture,
    email,
    title,
    description,
    tags,
    time,
    upvote,
    downvote,
    comment,
  } = post;

  const { user } = useContext(AuthContext);

  const [currentUpvote, setCurrentUpvote] = useState(upvote);
  const [currentDownvote, setCurrentDownvote] = useState(downvote);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleUpvote = async () => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
    }
    try {
      const response = await axiosPublic.patch(`/upvote/${_id}`);
      setCurrentUpvote(response.data.upvote);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
    }
    try {
      const response = await axiosPublic.patch(`/downvote/${_id}`);
      setCurrentDownvote(response.data.downvote);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  // console.log(email);

  // for comment push to database
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (user) {
      // for checking commenter email and author email
      if (user.email === email) {
        toast.error('You should not comment in your post :)');
        return;
      }
      const comment = e.target.comment.value;
      const commentItem = {
        comment,
        postId: _id,
        commenter: user.email,
      };
      axiosPublic.post('/comment', commentItem).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          toast.success('Successfully commented!');
          e.target.reset();
        }
      });
    } else {
      navigate('/login', { state: { from: window.location.pathname } });
    }
  };

  const shareUrl = `https://forum-flare.web.app/postDetails/${_id}`;

  const handleShare = () => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
    }
  };

  return (
    <div className="lg:max-w-[1280px] md:max-w-[700px] max-w-[375px] mx-auto">
      <div className="w-10/12 mx-auto mt-10">
        <div className="card min-w-96 bg-base-100 shadow-xl ">
          <figure>
            <img src={authorPicture} className="w-full h-80 object-cover" />
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
            <p className="my-5">{description}</p>
            <div className="card-actions ">
              <p className="flex items-center gap-2 text-xl">
                <FaComment className="text-rose-600"></FaComment>
                {comment}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleUpvote}
                  className="badge badge-outline px-5 py-3"
                >
                  <FaThumbsUp className="mr-2 text-primary"></FaThumbsUp>
                  {currentUpvote}
                </button>
                <button
                  onClick={handleDownvote}
                  className="badge badge-outline px-5 py-3"
                >
                  <FaThumbsDown className="mr-2 text-rose-600"></FaThumbsDown>
                  {currentDownvote}
                </button>
              </div>
            </div>

            {/* Share button */}
            <div className="Demo__container mt-5 mx-auto">
              <div className="Demo__some-network">
                {!user ? (
                  <FacebookIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <FacebookShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round></FacebookIcon>
                  </FacebookShareButton>
                )}
              </div>

              <div className="Demo__some-network">
                {!user ? (
                  <FacebookMessengerIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <FacebookMessengerShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookMessengerIcon
                      size={32}
                      round
                    ></FacebookMessengerIcon>
                  </FacebookMessengerShareButton>
                )}
              </div>

              <div className="Demo__some-network">
                {!user ? (
                  <XIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <TwitterShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <XIcon size={32} round></XIcon>
                  </TwitterShareButton>
                )}
              </div>
              <div className="Demo__some-network">
                {!user ? (
                  <WhatsappIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <WhatsappShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <WhatsappIcon size={32} round></WhatsappIcon>
                  </WhatsappShareButton>
                )}
              </div>
              <div className="Demo__some-network">
                {!user ? (
                  <LinkedinIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round></LinkedinIcon>
                  </LinkedinShareButton>
                )}
              </div>
              <div className="Demo__some-network">
                {!user ? (
                  <EmailIcon
                    onClick={handleShare}
                    size={32}
                    round
                    className="Demo__some-network__share-button"
                  />
                ) : (
                  <EmailShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <EmailIcon size={32} round></EmailIcon>
                  </EmailShareButton>
                )}
              </div>
            </div>

            {/* comment box */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex gap-2 items-start mt-5 "
            >
              <div className="w-10 h-10  ">
                <img
                  src={user ? user.photoURL : placeholder}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-grow ">
                <textarea
                  name="comment"
                  className="textarea textarea-bordered w-full"
                  placeholder="Your comment here .."
                ></textarea>
              </div>

              <input
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
                value="Post"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
