import Button from "components/Button"
import { colors } from "styles/theme"
import { loginWithGitHub } from "firebase/client"
import { useEffect } from "react"
import GitHub from "components/Icons/GitHub"
import Head from "next/head"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  // Si existe usuario se redirecciona a la pag home
  useEffect(() => {
    user && router.replace("/home")
  }, [user])
  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
      console.log(user)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/vector.png" alt="logo" />
        <h1>Devter</h1>
        <h2>
          Talk about development
          <br /> with developers 👩‍💻 👨‍💻{" "}
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            /* se pasa la referencia de la función, pero no se ejecuta cuando se
            renderiza el componente, se le pasa la función mas no la ejecución, e.g handleClick() este 
            se ejecuta inmediatamente después de renderizar el componente */
            <Button onClick={handleClick}>
              <GitHub fill={colors.white}></GitHub>
              Login with Github
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 8px;
        }

        h2 {
          color: ${colors.black};
          font-size: 21px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}
