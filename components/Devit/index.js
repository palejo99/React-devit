import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  img,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
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
            <date>{timeago}</date>
          </header>
          <p>{content}</p>
          {
            // Si se tiene la imagen, se renderiza
            img && <img src={img} />
          }
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          padding: 10px 15px;
          display: flex;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
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
