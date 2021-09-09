import Link from "next/link";

function Timeline({ userName }) {
  return (
    <>
      <h1>This is the timeline of {userName}</h1>
      <Link href="/">Regresar</Link>
      <style jsx>
        {`
          h1 {
            font-size: 36px;
          }
        `}
      </style>
    </>
  );
}

// Obtener información para pasarle al componente (Solamente funciona en componentes de tipo página)
// Timeline.getInitialProps = () => {
//   // return { userName: '@danhiel98' }
//   return fetch("http://localhost:3000/api/hello")
//     .then((res) => res.json())
//     .then((response) => {
//       console.log(response);
//       const { userName } = response;
//       return { userName };
//     });
// };

// Cargar props estáticos
export async function getStaticProps(context) {
  return fetch("http://localhost:3000/api/hello")
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const { userName } = response;
      return { props: { userName: `${userName}` } };
    });
}

// Cargar props del servidor
// export async function getServerSideProps(context) {
//   return fetch("http://localhost:3000/api/hello")
//     .then((res) => res.json())
//     .then((response) => {
//       console.log(response);
//       const { userName } = response;
//       return { props: { userName: "getServerSideProps" } };
//     });
// }

export default Timeline;
