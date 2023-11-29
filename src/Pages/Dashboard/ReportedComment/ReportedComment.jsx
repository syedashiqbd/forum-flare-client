import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import toast from 'react-hot-toast';
import RestComment from '../../../components/RestComment/RestComment';

const ReportedComment = () => {
  const [actionName, setActionName] = useState();
  const axiosSecure = useAxiosSecure();

  const { data: reportedComments, refetch } = useQuery({
    queryKey: ['reportedComments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/comment');
      return res.data;
    },
  });

  const handleActionName = (e) => {
    setActionName(e);
  };

  const actionSubmit = (commentId) => {
    axiosSecure
      .patch(`/comments/${commentId}/action`, {
        action: actionName,
      })
      .then((res) => {
        // console.log(feedbackRes.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Action Submitted Successfully');
          refetch();
        }
      })
      .catch((error) => {
        console.error('Error updating feedback:', error);
      });
  };

  return (
    <div className="w-11/12 mx-auto ">
      <h2 className="text-3xl font-semibold uppercase text-end">
        Total Reported Comment : {reportedComments?.length}
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
              <th className="text-center">Action</th>
              <th className="text-center">Submit</th>
            </tr>
          </thead>
          <tbody>
            {reportedComments?.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-bold">{comment.commenter}</div>
                </td>
                <td>
                  {/* <div>{comment.comment}</div> */}
                  <RestComment comment={comment.comment}></RestComment>
                </td>

                <td>
                  <div>{comment.feedback}</div>
                </td>
                <td className="text-center">
                  <select
                    defaultValue={comment.action ? comment.action : ''}
                    disabled={comment.action}
                    onChange={(e) => handleActionName(e.target.value)}
                  >
                    <option disabled value="">
                      Select Action
                    </option>
                    <option value="Flag">Flag</option>
                    <option value="Muted">Muted</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn"
                    disabled={comment.action}
                    onClick={() => actionSubmit(comment._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReportedComment;
