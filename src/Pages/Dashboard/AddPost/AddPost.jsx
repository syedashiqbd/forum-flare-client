import { useForm } from 'react-hook-form';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaPenSquare } from 'react-icons/fa';
import { useTags } from '../../../components/useTags';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { UserDetails } from '../../../components/UserDetails';

const AddPost = () => {
  // user data fetching by email
  const { user, userDetails, refetch } = UserDetails();
  const { badge, userPost } = userDetails;

  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  // all tags fetching
  const tags = useTags();

  //   to add post to database
  const onSubmit = async (data) => {
    const postItem = {
      authorName: data.name,
      authorPicture: data.image,
      email: data.email,
      title: data.title,
      description: data.description,
      tags: data.tag,
      time: new Date(),
      upvote: 0,
      downvote: 0,
    };
    const postResponse = await axiosSecure.post('/posts', postItem);
    // console.log(postResponse.data);
    if (postResponse.data.insertedId) {
      // show popup
      reset();
      refetch();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${data.title} added successfully`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div>
      {userPost?.length > 4 && badge === 'bronze' ? (
        <div className="text-center border py-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded ">
          <p className="text-white text-3xl">
            You are exceeding the limit of Bronze user !!!
          </p>
          <Link to="/membership">
            <button className="btn btn-warning mt-5">
              Become a Gold Member
            </button>
          </Link>
        </div>
      ) : (
        <div className="card shrink-0 w-full lg:w-9/12 mx-auto shadow-2xl bg-base-100">
          <img
            src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-t-xl h-60 object-cover"
          />
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="flex gap-4 justify-between w-full">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Image</span>
                </label>
                <input
                  {...register('image', { required: true })}
                  type="text"
                  placeholder={user.photoURL}
                  defaultValue={user.photoURL}
                  className="input input-bordered text-gray-400"
                  readOnly
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Name</span>
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder={user.displayName}
                  defaultValue={user.displayName}
                  className="input input-bordered text-gray-400"
                  readOnly
                />
              </div>
            </div>
            <div className="flex gap-4 justify-between w-full">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Email</span>
                </label>
                <input
                  {...register('email', { required: true })}
                  type="text"
                  placeholder={user.email}
                  defaultValue={user.email}
                  className="input input-bordered text-gray-400"
                  readOnly
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Select Tag</span>
                </label>
                <select
                  {...register('tag', { required: true })}
                  defaultValue=""
                  className="select select-bordered w-full border-base-300 text-slate-500"
                >
                  <option disabled value="">
                    Select a Tag
                  </option>

                  {tags?.map((tag) => (
                    <option key={tag._id} value={tag.tagName}>
                      {tag.tagName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Title</span>
              </label>
              <input
                {...register('title', { required: true })}
                placeholder="Recipe Details"
                className="textarea textarea-bordered textarea-md w-full "
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Description</span>
              </label>
              <textarea
                {...register('description', { required: true })}
                placeholder="Recipe Details"
                className="textarea textarea-bordered textarea-md w-full "
              ></textarea>
            </div>

            <div className="form-control mt-4 max-w-max ">
              <button className="btn btn-primary text-white ">
                Add Post
                <FaPenSquare></FaPenSquare>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default AddPost;
