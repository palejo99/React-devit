import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhic25o6zbA1xxfVAHdm5Tn9xi6DEiZyk",
  authDomain: "devter-56565.firebaseapp.com",
  projectId: "devter-56565",
  storageBucket: "devter-56565.appspot.com",
  messagingSenderId: "825633220520",
  appId: "1:825633220520:web:0c4a953f01c4476de71f9d",
  measurementId: "G-7N37FHG4MF",
}
// Condicional para no duplicar sesiones de firebase
//! firebase.apps.length
firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig) // si no se tiene ninguna sesión entonces inicialice la app

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user
  // const {username,profile}= additionalUserInfo
  // const {avatar_url} =profile

  return {
    //    avatar:avatar_url,
    avatar: photoURL,
    email: email,
    username: displayName,
  }
}
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    // Si existe usuario se mapea su información de lo contrario se retorna null
    const normalizeUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizeUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()

  return firebase.auth().signInWithPopup(githubProvider)
}
