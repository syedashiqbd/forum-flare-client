import { useContext } from 'react';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPublic = useAxiosPublic();

  const handleGoogleSingIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };

        axiosPublic.post('/users', userInfo).then((res) => {
          console.log(res.data);
        });

        navigate(location?.state ? location.state.from : '/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <span className="divider text-primary mt-5">Social Login</span>
      <div className="flex justify-center gap-4">
        <Link onClick={handleGoogleSingIn}>
          <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl">
            <FcGoogle></FcGoogle>
          </div>
        </Link>
        <Link>
          <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl text-blue-700">
            <FaFacebookF></FaFacebookF>
          </div>
        </Link>
        <Link>
          <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl text-blue-700 ">
            <FaLinkedinIn></FaLinkedinIn>
          </div>
        </Link>
      </div>
    </>
  );
};
export default SocialLogin;
