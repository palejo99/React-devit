import { colors } from "../../styles/theme"

export default function Button({ children, onClick }) {
  // el children va a ser lo q contenga el botón

  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border: 0;
          cursor: pointer;
          color: ${colors.white};
          border-radius: 9999px;
          font-weight: 800;
          font-size: 16px;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          /* si dentro del botón existe un svg se ajusta el estilo*/
          padding-right: 8px;
        }
        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
