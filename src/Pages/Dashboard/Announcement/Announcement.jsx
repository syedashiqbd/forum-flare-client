// import { useForm } from 'react-hook-form';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const Announcement = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const axiosPublic = useAxiosPublic();
//   const axiosSecure = useAxiosSecure();

//   const onSubmit = async (data) => {
//     //image upload to imgbb and then get an url
//     const imageFile = { image: data.image[0] };
//     const res = await axiosPublic.post(image_hosting_api, imageFile, {
//       headers: { 'content-type': 'multipart/form-data' },
//     });
//     if (res.data.success) {
//       console.log(res.data.success);
//       //now send the announcement to the server with the image url
//       const announcementData = {
//         image: res.data.data.display_url,
//         // image:data.image,
//         name: data.name,
//         title: data.title,
//         description: data.description,
//       };
//       //   console.log(announcementData);
//       const res = await axiosSecure.post('/announcement', announcementData);
//       console.log(res.data);
//       if (res.data.insertedId) {
//         // show popup
//         reset();
//         Swal.fire({
//           position: 'top-end',
//           icon: 'success',
//           title: `Announcement added successfully`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     }
//     console.log('with image url', res);
//   };
//   return (
//     <div>
//       <p className="text-center text-3xl font-bold border-t-2 border-b-2 py-4 w-8/12 mx-auto mb-10 text-amber-600">
//         Make an Announcement !!!
//       </p>
//       <div className="card shrink-0 w-full lg:w-9/12 mx-auto shadow-2xl bg-base-100">
//         <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//           <div>
//             <label className="label">
//               <span className="label-text">Author Image</span>
//             </label>
//             <input
//               {...register('image', { required: true })}
//               type="file"
//               className="file-input file-input-bordered file-input-md w-full max-w-xs"
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Author name</span>
//             </label>
//             <input
//               {...register('name', { required: true })}
//               type="text"
//               placeholder="Author name"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input
//               {...register('title', { required: true })}
//               type="text"
//               placeholder="Announcement Title"
//               className="input input-bordered"
//               required
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Description</span>
//             </label>
//             <textarea
//               {...register('description')}
//               placeholder="Announcement Description"
//               className="textarea textarea-bordered textarea-md w-full "
//             ></textarea>
//           </div>

//           <div className="form-control mt-4 max-w-max">
//             <button className="btn btn-primary text-white ">
//               Add Announcement
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Announcement;

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
