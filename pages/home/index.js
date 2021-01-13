import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ id, username, avatar, message }) => {
            return (
              <Devit
                key={id}
                id={id}
                username={username}
                avatar={avatar}
                message={message}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>
        {`
          header {
            align-items: center;
            border-top: 1px solid #ccc;
            height: 49px;
            position: fixed;
            display: sticky;
            top: 0;
            width: 100%;
          }

          h2 {
            font-size: 22px;
            font-weight: 800;
          }

          section {
            padding-top: 56px;
          }
          nav {
            bottom: 0;
            border-top: 1px solid #ccc;
            height: 49px;
            display: flex;
            position: sticky;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
