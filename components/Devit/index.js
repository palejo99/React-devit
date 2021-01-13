import Avatar from "components/Avatar"

export default function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
        }

        div {
          padding-right: 10px;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }
      `}</style>
    </>
  )
}
