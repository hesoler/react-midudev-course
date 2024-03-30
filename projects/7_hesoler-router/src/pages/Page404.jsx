import { Link } from '../components/Link'

export default function Page404 () {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img src='https://midu.dev/images/this-is-fine-404.gif' alt='This is Fine dog burning alive gif' />
      </div>
      <Link to='/'>Back to Home</Link>
    </>
  )
}
