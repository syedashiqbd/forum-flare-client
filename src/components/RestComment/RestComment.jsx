import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';

const RestComment = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullComment, setFullComment] = useState('');

  const handleReadMore = (comment) => {
    setFullComment(comment);
    setIsModalOpen(true);
  };

  const cutComment =
    comment.length > 20 ? comment.substring(0, 20) + '...' : comment;
  return (
    <div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {cutComment}
      </div>
      {comment.length > 20 && (
        <Link
          className="underline text-blue-600"
          to=""
          onClick={() => handleReadMore(comment)}
        >
          Read More
        </Link>
      )}

      {/* for modal */}
      <div>
        {/* <div comment={comment} handleReadMore={handleReadMore}></div> */}
        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          comment={fullComment}
        />
      </div>
    </div>
  );
};
export default RestComment;
