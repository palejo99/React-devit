import Avatar from "components/Avatar"

export default function Devit({ avatar, userName, content, createdAt, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
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

        span {
          margin: 0 5px;
        }

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
