import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"
import { addDevit } from "firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCESS: 2,
  ERROR: -1,
}
export default function ComposeTweet() {
  // Variables para guardar el mensaje y setear el usuario
  const user = useUser()
  const router = useRouter()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [message, setMessage] = useState("")
  // Se recibe el evento del onChange, se extrae el valor y se guarda el mensaje
  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  // De esta manera se previene que el usuario presione el botón de manera desesperada o múltiples veces.
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            /* Cada vez que hay un cambio en el textarea(evento) se ejecuta el sgte evento */
            onChange={handleChange}
            placeholder="¿Qué está pasando?"
            value={message}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          padding: 15px;
          resize: none;
          min-height: 200px;
          outline: 0;
          font-size: 21px;
          font-family: "system-ui";
          width: 100%;
        }
      `}</style>
    </>
  )
}
