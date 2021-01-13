import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button"
import { colors } from "styles/theme"
import { loginWithGitHub, onAuthStateChanged } from "firebase/client"
import { useState, useEffect } from "react"
import GitHub from "components/Icons/GitHub"
import Head from "next/head"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])
  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
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

      <AppLayout>
        <section>
          <img src="/vector.png" alt="logo" />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br /> with developers 👩‍💻 👨‍💻{" "}
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill={colors.white}></GitHub>
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
                <strong>{user.email}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

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
