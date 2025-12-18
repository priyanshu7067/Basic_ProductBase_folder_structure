const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className="relative  mb-3 h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4
                 border-gray-900/10 bg-gray-900/5 hover:bg-gray-900/10
                 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
    >
      <div className="flex items-center gap-2">
        <img src={img} width={32} height={32} className="rounded-full" alt="" />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm ">{body}</blockquote>
    </figure>
  );
};

export default ReviewCard;