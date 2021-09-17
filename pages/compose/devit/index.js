import Head from 'next/head'
import Layout from 'components/layout'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { addDevit, downloadURL, uploadImage } from 'firebase_config/client'
import { useRouter } from 'next/router'
import { COMPOSE_STATES, DRAG_IMAGE_STATES } from 'utils'

export default function ComposeDevit() {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (task) {
      task.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.log(error)
        },
        async () => {
          const url = await downloadURL(task)
          setImageUrl(url)
        }
      )
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target

    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      imageUrl
    })
      .then((docRef) => {
        console.log(docRef.id)
        router.push('/home')
        setStatus(COMPOSE_STATES.SUCCESS)
      })
      .catch((err) => {
        setStatus(COMPOSE_STATES.ERROR)
        console.log(err)
      })
  }

  const isButtonDisabled = () => {
    return !message.length || status === COMPOSE_STATES.LOADING
  }

  const handleDragEnter = (ev) => {
    ev.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (ev) => {
    ev.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (ev) => {
    ev.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = ev.dataTransfer.files[0]

    const task = uploadImage(file)

    setTask(task)
  }

  return (
    <>
      <Head>
        <title>Crear Devit</title>
      </Head>
      <div className="md:max-w-lg md:mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex mx-auto">
            {user && (
              <img
                className="h-16 w-16 rounded-full p-2"
                src={user.avatar}
                alt={`${user.username}'s avatar'`}
              />
            )}
            <div className="block w-full">
              <textarea
                className={`txtdevit resize-none ${
                  drag === DRAG_IMAGE_STATES.DRAG_OVER
                    ? 'border-dashed border-blue-500'
                    : ''
                }`}
                rows="4"
                placeholder="¿Qué estás pensando?"
                onChange={handleChange}
                value={message}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              ></textarea>
              {imageUrl && (
                <div className="h-40 w-40 relative">
                  <button
                    className="absolute rounded-full px-2 bg-black text-white right-0"
                    onClick={() => setImageUrl(null)}
                  >
                    x
                  </button>
                  <img
                    src={imageUrl}
                    alt="Imagen adjunta"
                    className="object-cover max-h-40 mx-auto"
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn-black float-right"
                disabled={isButtonDisabled()}
              >
                Devitear
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

ComposeDevit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
