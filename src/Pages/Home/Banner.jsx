const Banner = ({ handleSearchTag }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search_text.value;
    handleSearchTag(search);
    e.target.search_text.value = '';
  };

  return (
    <div className="lg:max-w-[1280px] md:max-w-[700px] max-w-[375px] mx-auto">
      <div className="flex flex-col items-center justify-center  lg:p-[150px] md:pt-20">
        <h1 className="text-[0B0B0B] lg:text-5xl text-4xl font-bold text-center">
          Unleash Your Voice in Our <br /> Vibrant Forum Community!
        </h1>
        <div className="mt-10">
          <form onSubmit={handleSubmit} className="flex">
            <input
              className="border border-[#DEDEDE] rounded-l-lg p-3 md:w-[360px] max-w-[360px]  outline-none focus:border-gray-700"
              type="search"
              name="search_text"
              id=""
              placeholder="Search by tag...."
            />
            <input
              className="bg-primary text-white font-semibold rounded-r-lg max-w-[110px] px-4"
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Banner;
