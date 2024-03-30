import { Link } from '../components/Link.jsx'
import PropTypes from 'prop-types'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la Home',
    description: 'Hola! Mi nombre es Héctor y estoy creando un clon de React Router',
    linkQuery: '/es/about',
    labelLink: 'ES'
  },
  en: {
    title: 'About us',
    button: 'Go to Home',
    description: 'Hi! My name is Héctor and I\'m making a React Router clone',
    linkQuery: '/en/about',
    labelLink: 'EN'
  }
}

const useI18n = lang => i18n[lang] || i18n.en

export default function AboutPage({ routeParams }) {
  const { title, button, description } = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{title}</h1>
      <img
        src='https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2022/07/Cat.jpg?w=876&h=493&crop=1'
        alt='Gatito sorprendido'
        width='250px'
      />
      <span style={{ float: 'right' }}>
        <Link to={i18n.en.linkQuery}>{i18n.en.labelLink}</Link>
        &nbsp;
        <Link to={i18n.es.linkQuery}>{i18n.es.labelLink}</Link>
      </span>
      <p>{description}</p>
      <Link to='/'>{button}</Link>
    </>
  )
}

AboutPage.propTypes = {
  routeParams: PropTypes.object
}
