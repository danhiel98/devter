import Layout from 'components/layout'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { addDevit } from 'firebase_config/client'
import { useRouter } from 'next/dist/client/router'
import { COMPOSE_STATES } from 'utils'

export default function ComposeDevit() {
  // eslint-disable-next-line no-unused-vars
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

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
      userName: user.username
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

  return (
    <>
      <div className="md:max-w-lg md:mx-auto">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            placeholder="¿Qué estás pensando?"
            onChange={handleChange}
            value={message}
          ></textarea>
          <button
            type="submit"
            className="btn-black float-right"
            disabled={isButtonDisabled()}
          >
            Devitear
          </button>
        </form>
      </div>
    </>
  )
}

ComposeDevit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
