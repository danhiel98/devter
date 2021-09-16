import 'styles/globals.css' // Estilos globales aplicados a todos los componentes cargados
import 'antd/dist/antd.css'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
