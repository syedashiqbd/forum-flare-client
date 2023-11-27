import { FaTrashAlt } from 'react-icons/fa';
import { UserDetails } from '../../../components/UserDetails';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyPost = () => {
  // user data fetching by email
  const { userDetails, refetch } = UserDetails();
  const { userPost } = userDetails;

  //   post deleted functionality
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/post/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Post has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };
  
  return (
    <div className="w-11/12 mx-auto ">
      <h2 className="text-3xl font-semibold uppercase">
        Total Post : {userPost?.length}
      </h2>

      {/* Table */}
      <div
        className="overflow-x-auto mt-5
rounded-t-lg"
      >
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-white  ">
            <tr>
              <th>SL</th>
              <th>Post Title</th>
              <th>Upvote</th>
              <th>Downvote</th>
              <th className="text-center">Comment</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userPost?.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">
                    <Link to={`/postDetails/${post._id}`}>{post.title}</Link>
                  </div>
                </td>
                <td>
                  <div>{post.upvote}</div>
                </td>
                <td>
                  <div>{post.downvote}</div>
                </td>
                <td>
                  <div className="font-bold">{post.email}</div>
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
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-orange-600 text-xl"
                  >
                    <FaTrashAlt></FaTrashAlt>
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
export default MyPost;
