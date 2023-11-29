import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiArticleFill } from 'react-icons/ri';
import { FaComment, FaUser } from 'react-icons/fa';
import { PieChart, Pie, Cell } from 'recharts';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  //   console.log(stats);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const tagData = {
      tagName: data.tag,
    };
    const res = await axiosSecure.post('/tags', tagData);
    console.log(res.data);
    if (res.data.insertedId) {
      // show popup
      reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${data.tag} added successfully`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  //   custom shape for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = [
    { name: 'Post', value: stats?.posts },
    { name: 'User', value: stats?.users },
    { name: 'Comment', value: stats?.comments },
  ];

  return (
    <div className="text-center ml-10 ">
      <div className="relative w-40 mx-auto mt-10">
        <img
          src={user?.photoURL}
          className=" rounded-lg w-40 h-40 object-cover "
        />
      </div>
      <h1 className="text-5xl font-bold my-3  ">{user?.displayName}</h1>
      <p className=" font-semibold  ">{user?.email}</p>
      <div className="flex gap-6 justify-between mt-10 ">
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-purple-500 to-purple-100 py-4 pl-5 pr-10 ">
          <RiArticleFill className="text-5xl"></RiArticleFill>
          <div className="text-center">
            <h1 className="text-5xl font-bold">{stats?.posts}</h1>
            <p className="text-lg">Post</p>
          </div>
        </div>
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-amber-500 to-amber-100 py-4 pl-5 pr-10 ">
          <FaUser className="text-5xl"></FaUser>
          <div className="text-center">
            <h1 className="text-5xl font-bold"> {stats?.users}</h1>
            <p className="text-lg">User</p>
          </div>
        </div>
        <div className=" rounded-lg min-w-[250px] flex justify-center items-center gap-3 text-white bg-gradient-to-r from-pink-500 to-pink-100 py-4 pl-5 pr-10 ">
          <FaComment className="text-5xl"></FaComment>
          <div className="text-center">
            <h1 className="text-5xl font-bold"> {stats?.comments}</h1>
            <p className="text-lg">Comments</p>
          </div>
        </div>
      </div>
      {/* Pie chart */}

      <PieChart width={400} height={400} className="mx-auto  ">
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {/* Add tag section */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body w-6/12 mx-auto"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tag name</span>
            </label>
            <input
              {...register('tag', { required: true })}
              type="text"
              placeholder="Tag name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-4 max-w-max mx-auto ">
            <button className="btn btn-primary text-white ">Add Tag</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminProfile;
