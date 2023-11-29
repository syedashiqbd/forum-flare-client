import { useLoaderData } from 'react-router-dom';
import RestComment from './RestComment/RestComment';
import { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CommentDetails = () => {
  const prevComments = useLoaderData();

  const [comments, setComments] = useState(prevComments);
  const [reportedComments, setReportedComments] = useState([]);
  const [feedback, setFeedback] = useState({});

  const axiosSecure = useAxiosSecure();

  const handleFeedbackChange = (commentId, selectedFeedback) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [commentId]: selectedFeedback,
    }));
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, selectedFeedback } : comment
      )
    );
  };

  const handleReportClick = (commentId) => {
    const selectedFeedback = feedback[commentId];

    if (!selectedFeedback) {
      return;
    }
    axiosSecure
      .patch(`/comments/${commentId}/feedback`, {
        feedback: selectedFeedback,
      })
      .then((res) => {
        // console.log(feedbackRes.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Comment Reported Successfully');
        }
      })
      .catch((error) => {
        console.error('Error updating feedback:', error);
        setReportedComments((prevReported) => [...prevReported, commentId]);
      });
    //   to be changed later
    window.location.reload();
  };

  return (
    <div className="w-11/12 mx-auto ">
      <h2 className="text-3xl font-semibold uppercase text-end">
        Total Comment : {comments?.length}
      </h2>

      {/* Table */}
      <div
        className="overflow-x-auto mt-5
rounded-t-lg"
      >
        <table className="table">
          {/* head */}
          <thead className="bg-neutral text-white  ">
            <tr>
              <th>SL</th>
              <th>Commenter Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th className="text-center">Report</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-bold">{comment.commenter}</div>
                </td>
                <td>
                  <div>
                    <div>
                      {/* for modal open above 20 character */}
                      <RestComment comment={comment.comment}></RestComment>
                    </div>
                  </div>
                </td>

                <td>
                  <select
                    defaultValue={comment.feedback ? comment.feedback : ''}
                    onChange={(e) =>
                      handleFeedbackChange(comment._id, e.target.value)
                    }
                  >
                    <option disabled value="">
                      Select Feedback
                    </option>
                    <option value="Inappropriate">Inappropriate</option>
                    <option value="Spam">Spam</option>
                    <option value="Offensive">Offensive</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    className="text-orange-600  btn btn-sm"
                    onClick={() => handleReportClick(comment._id)}
                    disabled={
                      !feedback[comment._id] ||
                      reportedComments.includes(comment._id) ||
                      comment.reported
                    }
                  >
                    Report
                  </button>
                </td>
                <td className="text-error font-bold">
                  {comment.action ? comment.action : 'Processing'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CommentDetails;
