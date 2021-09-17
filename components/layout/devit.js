export default function Devit({ userName, avatar, content, createdAt }) {
  return (
    <div className="lg:max-w-2xl bg-white rounded-xl shadow-md overflow-hidden lg:mx-auto m-3">
      <div className="flex">
        <div className="flex-shrink-0 border-black">
          <img
            className="h-16 w-16 rounded-full p-2"
            src={avatar}
            alt={`${userName}'s avatar'`}
          />
        </div>
        <div className="p-2 w-full">
          <div className="content-between">
            <a
              href="#"
              className="mt-1 text-lg leading-tight font-medium text-black"
            >
              {userName}
            </a>
            <span className="float-right">{createdAt}</span>
          </div>
          <p className="mt-2 text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  )
}
