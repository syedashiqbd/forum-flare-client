import { FaComment, FaPen, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
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

const PostDetails = () => {
  const post = useLoaderData();

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

  const shareUrl = `https://forum-flare.web.app/postDetails/${_id}`;

  //   const shareUrl = `https://assignment-champs-ashiq.web.app/assignment-details/65483e9276bbc270b11e2c5b`;

  const ShareTitle = title;

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
              <p className="text-xs">{time}</p>
              <div className="badge badge-secondary">{tags}</div>
            </div>
            <p className="my-5">{description}</p>
            <div className="card-actions ">
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
            {/* Share button */}
            <div className="Demo__container mt-5 ">
              <div className="Demo__some-network">
                <FacebookShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <div>
                  <FacebookShareCount
                    url={shareUrl}
                    className="Demo__some-network__share-count"
                  >
                    {(count) => count}
                  </FacebookShareCount>
                </div>
              </div>

              <div className="Demo__some-network">
                <FacebookMessengerShareButton
                  url={shareUrl}
                  appId="521270401588372"
                  className="Demo__some-network__share-button"
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </div>

              <div className="Demo__some-network">
                <TwitterShareButton
                  url={shareUrl}
                  title={ShareTitle}
                  className="Demo__some-network__share-button"
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
              </div>

              <div className="Demo__some-network">
                <TelegramShareButton
                  url={shareUrl}
                  title={ShareTitle}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <div className="Demo__some-network">
                <WhatsappShareButton
                  url={shareUrl}
                  title={ShareTitle}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="Demo__some-network">
                <LinkedinShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>

              <div className="Demo__some-network">
                <RedditShareButton
                  url={shareUrl}
                  title={ShareTitle}
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button"
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>

                <div>
                  <RedditShareCount
                    url={shareUrl}
                    className="Demo__some-network__share-count"
                  />
                </div>
              </div>

              <div className="Demo__some-network">
                <EmailShareButton
                  url={shareUrl}
                  subject={ShareTitle}
                  body="body"
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>

              <div className="Demo__some-network">
                <LineShareButton
                  url={shareUrl}
                  title={ShareTitle}
                  className="Demo__some-network__share-button"
                >
                  <LineIcon size={32} round />
                </LineShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
