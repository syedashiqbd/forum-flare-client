import { useLoaderData } from 'react-router-dom';
import RestComment from './RestComment/RestComment';

const CommentDetails = () => {
  const comments = useLoaderData();
  console.log(comments);
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
          <thead className="bg-success text-white  ">
            <tr>
              <th>SL</th>
              <th>Commenter Email</th>
              <th>Comment</th>
              <th className="text-center">Feedback</th>
              <th className="text-center">Report</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{item.commenter}</div>
                </td>
                <td>
                  <div>
                    <div>
                      {/* for modal open above 20 character */}
                      <RestComment comment={item.comment}></RestComment>
                    </div>
                  </div>
                </td>

                {/* <td className="text-center">
                  {user?.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button
                      //   onClick={() => handleMakeAdmin(user)}
                      className="text-orange-600 text-2xl"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td> */}
                <td className="text-center">
                  <button className="text-green-500 btn ">Feedback</button>
                </td>
                <td className="text-center">
                  <button className="text-orange-600  btn">Report</button>
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
