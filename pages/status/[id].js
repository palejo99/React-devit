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

// Hacer data fetching desde el servidor

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
