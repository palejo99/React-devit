const firebaseConfig = JSON.parce(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
console.log(process.env.FIREBASE_CONFIG)
const admin = require("firebase-admin")
const serviceAccount = require(firebaseConfig)
// const serviceAccount = require("../components/firebase-keys.json")

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
} catch (e) {
  console.log(e)
}

export const firestore = admin.firestore()
