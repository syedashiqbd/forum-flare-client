import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaChessKing, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useState } from 'react';
import Loading from '../../../components/Loading';

const ManageUsers = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['users', limit, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  // for pagination
  const { data: totalUser = { count: 0 } } = useQuery({
    queryKey: ['totalUser'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usercount`);
      return res.data;
    },
  });

  console.log(users);
  console.log(totalUser);

  const total = totalUser?.count;

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

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'An admin can do anything in this site!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make him admin!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          //   console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto relative ">
      <h2 className="text-3xl font-semibold uppercase">
        Total User : {users?.length}
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
              <th>User Name</th>
              <th>User Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{user.name}</div>
                </td>
                <td>
                  <div>{user.email}</div>
                </td>

                <td className="text-center">
                  {user?.role === 'admin' ? (
                    <button className="bg-primary text-white flex items-center gap-2 justify-center btn">
                      <FaChessKing></FaChessKing> Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-orange-600 flex items-center gap-2 justify-center btn"
                    >
                      <FaUsers className="text-2xl"></FaUsers> User
                    </button>
                  )}
                </td>
                <td>
                  <div className="bg-slate-800 p-2 text-white rounded-md w-24 text-center uppercase ">
                    {user.badge}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}

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
export default ManageUsers;
