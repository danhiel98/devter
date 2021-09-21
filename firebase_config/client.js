/**
 * Para conocer más sobre los scopes acceder a:
 * https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
 */
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  limit,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const storage = getStorage()

const mapResultFromFirebaseToUser = (user) => {
  const { email, screenName, photoUrl, localId } = user.reloadUserInfo
  return {
    email,
    username: screenName,
    avatar: photoUrl,
    uid: localId
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

export const addDevit = ({ content, userId, userName, avatar, imageUrl }) => {
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    userId,
    userName,
    imageUrl,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

const mapDevit = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: createdAt.toDate()
  }
}

export const listenLastestDevits = (callback) => {
  const devitsRef = collection(db, 'devits')
  const q = query(devitsRef, orderBy('createdAt', 'desc'), limit(20))

  onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(mapDevit))
  })
}

// export const fetchLastestDevits = () => {
//   const devitsRef = collection(db, 'devits')
//   const q = query(devitsRef, orderBy('createdAt', 'desc'))

//   return getDocs(q).then((snapshot) => {
//     return snapshot.docs.map(mapDevit)
//   })
// }

export const uploadImage = (file) => {
  const sref = ref(storage, `images/${file.name}`)

  return uploadBytesResumable(sref, file)
}

export const downloadURL = (task) => {
  return getDownloadURL(task.snapshot.ref).then((downloadURL) => downloadURL)
}
