const AnouncementCard = ({ announcement }) => {
  return (
    <div className="flex gap-3 p-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded text-white min-w-[380px]">
      <img
        className="w-20 h-20 object-cover rounded-full"
        src={announcement.image}
      />
      <div>
        <h1 className="text-lg font-bold">{announcement.title}</h1>
        <h1 className="font-semibold">{announcement.name}</h1>
        <h1>{announcement.description}</h1>
      </div>
    </div>
  );
};
export default AnouncementCard;
