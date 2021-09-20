var admin = require('firebase-admin')

var serviceAccount = require('./admin-keys.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
} else {
  admin.app()
}

export const firestore = admin.firestore()
