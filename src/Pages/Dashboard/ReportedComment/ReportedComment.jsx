import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import toast from 'react-hot-toast';
import RestComment from '../../../components/RestComment/RestComment';
import Loading from '../../../components/Loading';

const ReportedComment = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [actionName, setActionName] = useState();
  const axiosSecure = useAxiosSecure();

  const {
    data: reportedComments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reportedComments', limit, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comment?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  // for pagination
  const { data: totalRepComnt } = useQuery({
    queryKey: ['totalRepComnt'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/repocomment`);
      return res.data;
    },
  });

  const total = totalRepComnt?.count;

  const totalCount = Math.ceil(total / limit);

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
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="join my-6 flex justify-center mt-10">
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
  );
};
export default ReportedComment;
