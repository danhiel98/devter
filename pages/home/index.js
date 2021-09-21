import Layout from 'components/layout'
import useUser from 'hooks/useUser'
import { listenLastestDevits } from 'firebase_config/client'
import { useEffect, useState } from 'react'
import Devit from 'components/layout/devit'
import Head from 'next/head'

export default function HomePage() {
  const user = useUser()
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLastestDevits(setTimeline)
    }

    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devit</title>
      </Head>

      {timeline.map(
        ({ id, userName, avatar, content, createdAt, imageUrl }) => (
          <Devit
            key={id}
            id={id}
            userName={userName}
            avatar={avatar}
            content={content}
            createdAt={createdAt}
            imageUrl={imageUrl}
          />
        )
      )}
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
