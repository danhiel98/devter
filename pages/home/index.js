import Layout from 'components/layout'
import useUser from 'hooks/useUser'
import { fetchLastestDevits } from 'firebase_config/client'
import { useEffect, useState } from 'react'
import Devit from 'components/layout/devit'

export default function HomePage() {
  const user = useUser()
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    user && fetchLastestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      {console.log(timeline)}
      {timeline.map(({ id, userName, avatar, content, createdAt }) => (
        <Devit
          key={id}
          userName={userName}
          avatar={avatar}
          content={content}
          createdAt={createdAt}
        />
      ))}
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
