import { useEffect, useState } from 'react'
import AboutPage from '../pages/AboutPage.jsx'
import ContactsPage from '../pages/ContactsPage.jsx'
import GlossaryPage from '../pages/GlossaryPage.jsx'
import HomePage from '../pages/HomePage.jsx'

function getCurrentRoute() {
  const hash = window.location.hash
  return hash.startsWith('#/') ? hash.slice(2) : hash.slice(1)
}

function AppRoutes() {
  const [route, setRoute] = useState(getCurrentRoute)

  useEffect(() => {
    function updateRoute() {
      setRoute(getCurrentRoute())
    }

    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    if (['cursos', 'comunidad', 'inicio'].includes(route)) {
      window.requestAnimationFrame(() => {
        document.getElementById(route)?.scrollIntoView()
      })
      return
    }

    window.scrollTo(0, 0)
  }, [route])

  if (route === 'quienes-somos') return <AboutPage />
  if (route === 'contactos') return <ContactsPage />
  if (route === 'glosario') return <GlossaryPage />

  return <HomePage />
}

export default AppRoutes
