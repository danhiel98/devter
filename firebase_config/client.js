/**
 * Para conocer más sobre los scopes acceder a:
 * https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
 */
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD5NrPJQ1JMS2aWX_K24TFQDer_cv61XuU',
  authDomain: 'devter-80bbf.firebaseapp.com',
  projectId: 'devter-80bbf',
  storageBucket: 'devter-80bbf.appspot.com',
  messagingSenderId: '631546898472',
  appId: '1:631546898472:web:b4f8269f607d1f89eded1d',
  measurementId: 'G-DKF3F7C5V9'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const mapResultFromFirebaseToUser = (user) => {
  const { email, screenName, photoUrl } = user.reloadUserInfo
  return {
    email,
    username: screenName,
    avatar: photoUrl
  }
}

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapResultFromFirebaseToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider()
  // Permisos para información del usuario y de los repositorios
  provider.addScope('user')
  provider.addScope('repo')
  return (
    signInWithPopup(auth, provider)
      // .then(result => mapResultFromFirebaseToUser(result.user))
      .catch((err) => {
        const errorCode = err.code
        const errorMessage = err.message
        const email = err.email
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(err)
        // eslint-disable-next-line no-throw-literal
        throw {
          errorCode,
          errorMessage,
          email,
          credential
        }
      })
  )
}
