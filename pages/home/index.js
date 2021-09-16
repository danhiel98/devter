import Layout from '../../components/layout'

export default function HomePage() {
  return (
    <>
      <h1>Hola amigos</h1>
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
