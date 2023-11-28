import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { createUser, userProfileUpdate } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    // create user
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      //   profile update
      userProfileUpdate(data.name, data.photo)
        .then(() => {
          console.log(result.user);
          //   create user info in database
          const userInfo = {
            name: data.name,
            email: data.email,
            badge: 'bronze',
          };
          axiosPublic.post('/users', userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('user added to database', res.data);
              // reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `User created successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/');
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  {...register('name', { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register('photo', { required: true })}
                  placeholder="Enter your photo URL"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/,
                  })}
                  placeholder="Enter your password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === 'pattern' && (
                  <span className="text-red-600">
                    Password must have one Uppercase one Lowercase, one Number
                    and one special character
                  </span>
                )}
              </div>

              <div className="form-control mt-6 text-center">
                <input
                  className="btn btn-primary mb-3"
                  type="submit"
                  value="Sign Up"
                />
                <p>
                  Already have an account? Please{' '}
                  <Link
                    className="hover:underline text-red-600 font-bold"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
