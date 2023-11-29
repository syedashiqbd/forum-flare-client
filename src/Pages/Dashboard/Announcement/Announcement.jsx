import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Announcement = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const announcementData = {
      image: data.image,
      name: data.name,
      title: data.title,
      description: data.description,
    };
    //   console.log(announcementData);
    const res = await axiosSecure.post('/announcement', announcementData);
    console.log(res.data);
    if (res.data.insertedId) {
      // show popup
      reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Announcement added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <p className="text-center text-3xl font-bold border-t-2 border-b-2 py-4 w-8/12 mx-auto mb-10 text-amber-600">
        Make an Announcement !!!
      </p>
      <div className="card shrink-0 w-full lg:w-9/12 mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author Image URL</span>
            </label>
            <input
              {...register('image', { required: true })}
              type="text"
              placeholder="Author image URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author name</span>
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Author name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="Announcement Title"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register('description')}
              placeholder="Announcement Description"
              className="textarea textarea-bordered textarea-md w-full "
            ></textarea>
          </div>

          <div className="form-control mt-4 max-w-max">
            <button className="btn btn-primary text-white ">
              Add Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Announcement;
