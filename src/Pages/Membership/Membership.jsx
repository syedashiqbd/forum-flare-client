import { FaArrowAltCircleRight, FaListUl } from 'react-icons/fa';

const Membership = () => {
  return (
    <div className="lg:max-w-[1280px] md:max-w-[700px] max-w-[375px] mx-auto  mt-10 mb-20">
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl w-9/12 mx-auto">
          <figure className="w-5/12">
            <img
              src="https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Payment"
              className="object-cover h-full"
            />
          </figure>
          <div className="card-body w-7/12 relative">
            <img
              src="https://i.ibb.co/6nvbMcL/Gold-Membership.png"
              className="w-32 absolute -top-8 -right-8"
            />
            <h2 className="card-title text-4xl mb-5 font-bold z-10 text-[#F2277E]">
              Become A Gold Member
            </h2>
            <p>
              A membership in our forum unlocks a multitude of exclusive
              benefits designed to enhance your overall experience within the
              community. As a member, you gain privileged access to premium
              content, enjoying an ad-free environment for undisturbed
              engagement. Be at the forefront of innovation with early access to
              new features and updates, providing you with a sneak peek into the
              future of our platform.
            </p>
            <ul className="flex-grow mt-5">
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Life Time Access
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Member Badge/Icon
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Exclusive Content Access
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Ad-Free Experience
              </li>
              <li className="flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#F2277E]"></FaArrowAltCircleRight>
                Special Announcements
              </li>
            </ul>
            <div className="card-actions justify-between items-center mt-10">
              <h1 className="text-3xl font-bold">
                $<span className="text-success text-6xl">125</span>
              </h1>
              <button className="btn btn-primary  rounded">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Membership;
