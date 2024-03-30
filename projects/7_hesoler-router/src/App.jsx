import { Suspense, lazy } from 'react'
import './App.css'
import { Route } from './components/Route'
import { Router } from './components/Router'
import Page404 from './pages/Page404'
import SearchPage from './pages/Search'

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
          <Route path='/twitch' Component={() => <h1>Twitch</h1>} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
