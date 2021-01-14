import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/client"
import { useRouter } from "next/router"
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  // Una vez el usuario se autentifica se procede a setear el usuario
  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])
  // Si el usuario no está loggeado se manda a la pag principal
  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
