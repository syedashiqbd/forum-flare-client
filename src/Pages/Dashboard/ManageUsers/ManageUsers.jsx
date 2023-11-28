import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaChessKing, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

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
    <div className="w-11/12 mx-auto ">
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
    </div>
  );
};
export default ManageUsers;
