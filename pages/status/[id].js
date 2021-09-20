import Head from 'next/dist/shared/lib/head'
import Layout from 'components/layout'
import Devit from 'components/layout/devit'
import { firestore } from 'firebase_config/admin'
import { useRouter } from 'next/router'

export default function Status(props) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Detalle de devit</title>
      </Head>
      <Devit {...props} showDetail={true} />
    </>
  )
}

Status.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

// export async function getServerSideProps(context) {
//   // params, req, res, query
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }

//   if (res) {
//     res.writeHead(301, { Location: '/home' }).end()
//   }
// }

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'WLLGRrxWwON0WU0FpneL' } }],
    fallback: true // Permite generar las rutas estáticas después de la primera llamada
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      }

      return { props }
    })
    .catch((error) => {
      console.log('Hubo un error', error)
      return { props: {} }
    })
  // const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

  // if (apiResponse.ok) {
  //   const props = await apiResponse.json()

  //   return { props }
  // }
}

// Status.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: '/home' }).end()
//     }
//   })
// }
