import Head from 'next/head'
import Image from 'next/image'
import GitHub from '../components/icons/GitHub';
import { loginWithGitHub, onAuthStateChanged } from '../firebase/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    console.log("Has dado click");
    loginWithGitHub().then(user => {
      setUser(user);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-md mx-auto my-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-l content-between">
        <div className="h-48 w-48 object-cover relative mx-auto">
          <Image src={"/logo.svg"} layout="fill" alt="Logo" />
        </div>
        <div className="text-center pb-4">
          <h1 className="tracking-wide text-4xl font-semibold">
            <a className="text-blue-500" href="#">Devter</a>
          </h1>
          <div className="text-blue-400 text-lg">
            Talk about development<br/>with developers 👨‍💻👩‍💻
          </div>
          {
            user === null &&
              <button onClick={handleClick} className="bg-black text-white mt-2 py-1 px-2 rounded-xl flex items-center mx-auto hover:bg-gray-600">
                <GitHub fill="#fff" />
                <span className="ml-2">Login with GitHub</span>
              </button>
          }
          {
            user && user.avatar && (
              <div className="mt-2">
                <Image src={user.avatar} unoptimized width="100" height="100" alt="Avatar del usuario" className="mx-auto block" />
                <strong className="block">{user.username}</strong>
                <button className="bg-red-600 block text-white mx-auto p-1 rounded-md">Log Out</button>
              </div>
            )
          }
          {/* <nav className="mt-4">
            <Link href='/timeline'>Timeline</Link>
          </nav> */}
        </div>
      </main>
    </>
  )
}
