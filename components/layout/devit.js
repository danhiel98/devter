import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit({
  userName,
  avatar,
  content,
  createdAt,
  imageUrl,
  id,
  showDetail = false
}) {
  const timeAgo = useTimeAgo(createdAt)
  const router = useRouter()

  const handleDevitClick = (ev) => {
    ev.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <article className="lg:max-w-2xl bg-white rounded-xl shadow-md overflow-hidden lg:mx-auto m-3">
      <div
        className={`${
          !showDetail ? 'flex hover:bg-gray-100 cursor-pointer' : 'flex'
        }`}
        onClick={handleDevitClick}
      >
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
            <span className="float-right">
              <Link href={!showDetail ? `status/${id}` : '#'}>
                <a>{timeAgo}</a>
              </Link>
            </span>
          </div>
          <p className="mt-2 text-gray-500">
            {content}
            {imageUrl && (
              <img className="max-h-48" src={imageUrl} alt="Imagen del devit" />
            )}
          </p>
        </div>
      </div>
    </article>
  )
}
