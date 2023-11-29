import { motion } from 'framer-motion';

const Banner = ({ handleSearchTag }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search_text.value;
    handleSearchTag(search);
    e.target.search_text.value = '';
  };

  return (
    <div
      className="hero lg:h-[650px] h-[400px] bg-red-400"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        objectFit: 'cover',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-content text-center text-neutral-content"
      >
        <div className="lg:w-9/12 w-10/12 bg-black bg-opacity-40 lg:px-14 lg:py-20 md:px-10 md:py-12 p-5 rounded-lg flex flex-col justify-center items-center mt-20 lg:mt-0">
          <h1 className="lg:text-5xl text-xl font-bold">
            Unleash Your Voice in Our Vibrant Forum Community!
          </h1>

          <div className="lg:mt-10 mt-5">
            <form onSubmit={handleSubmit} className="flex">
              <input
                className="border border-[#DEDEDE] rounded-l-lg lg:p-3 p-1.5 md:w-[360px] max-w-[360px]  outline-none text-black "
                type="search"
                name="search_text"
                id=""
                placeholder="Search by tag...."
              />
              <input
                className="bg-primary  font-semibold rounded-r-lg max-w-[110px] lg:px-4 px-2"
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Banner;
