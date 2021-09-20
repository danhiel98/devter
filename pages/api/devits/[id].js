import { firestore } from 'firebase_config/admin'

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      let data = doc.data()
      data = {
        ...data,
        id,
        createdAt: data.createdAt.toDate()
      }
      res.json(data)
    })
    .catch(() => {
      res.status(404).end()
    })
}
