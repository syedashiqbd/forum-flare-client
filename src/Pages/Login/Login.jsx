import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import loginImage from '../../assets/login.png';

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Successfully login', {
          style: {
            background: '#5F2DED',
            color: 'white',
          },
        });
        navigate(location?.state ? location.state.from : '/');
      })
      .catch((error) => {
        toast.error('Firebase: Error (auth/invalid-login-credentials).', error);
      });
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <div className="py-6">
            <img src={loginImage} />
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6 text-center">
              <input
                className="btn btn-primary mb-3"
                type="submit"
                value="Login"
              />
              <p>
                Do not have an account? Please{' '}
                <Link
                  className="hover:underline text-red-600 font-bold"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
