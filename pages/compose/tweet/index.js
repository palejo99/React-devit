import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { addDevit, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}
export default function ComposeTweet() {
  // Variables para guardar el mensaje y setear el usuario
  const user = useUser()
  const router = useRouter()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [message, setMessage] = useState("")
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  // Se recibe el evento del onChange, se extrae el valor y se guarda el mensaje

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDragDrop = (e) => {
    e.preventDefault() // Para evitar el comportamiento normal del navegador
    // console.log(e)
    // console.log(e.dataTransfer.files[0])
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  // De esta manera se previene que el usuario presione el botón de manera desesperada o múltiples veces.
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <section className="form-container">
          {
            // Se espera a que llegue el usuario para poder renderizar el avatar
            user && (
              <section className="avatar-container">
                <Avatar src={user.avatar} />
              </section>
            )
          }

          <form onSubmit={handleSubmit}>
            <textarea
              /* Cada vez que hay un cambio en el textarea(evento) se ejecuta el sgte evento */
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDragDrop}
              placeholder="¿Qué está pasando?"
              value={message}
            ></textarea>
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        button {
          background: rgba(255, 255, 255, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
        }

        .remove-img {
          position: relative;
        }
        form {
          padding: 10px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"}; /*Valor calculado para propiedad border */
          border-radius: 10px;
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
