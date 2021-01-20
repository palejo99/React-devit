import Devit from "components/Devit"

// Recupera en está ocación la id del método getInitialProps
export default function DevitPage(props) {
  console.log(props)
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}
/*
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "TZeAnRWXjiPX6ywDFuXD" } }],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data() // convertir objeto complejo en data
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}
*/
// Hacer data fetching desde el servidor (forma moderna)

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }

  if (res) {
    res.writeHead(404).end()
  }
}

/*
DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query
  console.log("getInitialProps", id)
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
    // console.log(apiResponse)
    if (res) {
      res.writeHead(404).end()
    }
  })
}

*/
