import { useState } from 'react'

const navigation = [
  { href: '#cursos', label: 'Explorar cursos', section: 'home' },
  { href: '#/quienes-somos', label: 'Quiénes somos', section: 'about' },
  { href: '#/contactos', label: 'Contactos', section: 'contacts' },
  { href: '#/glosario', label: 'Glosario LGBT+', section: 'glossary' },
]

function SiteHeader({
  activeSection = 'home',
  onCreateCourse,
  onLogin,
  userName = '',
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <a className="brand" href="#/" aria-label="Campus Rebeldes, inicio" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">c.</span>
        <span>campus <strong>rebeldes</strong></span>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        {navigation.map((item) => (
          <a
            className={`nav-link ${activeSection === item.section ? 'nav-link-active' : ''}`}
            href={item.href}
            key={item.section}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        {onCreateCourse ? (
          <button className="button button-quiet creator-nav" onClick={onCreateCourse}>
            Quiero crear cursos <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <a className="button button-quiet creator-nav" href="#/" onClick={closeMenu}>
            Quiero crear cursos <span aria-hidden="true">↗</span>
          </a>
        )}
        {onLogin ? (
          <button className="profile-button" onClick={onLogin}>
            {userName ? (
              <>
                <span className="avatar">{userName.slice(0, 1).toUpperCase()}</span>
                <span className="profile-name">{userName}</span>
              </>
            ) : (
              'Entrar'
            )}
          </button>
        ) : (
          <a className="profile-button" href="#/" onClick={closeMenu}>Entrar</a>
        )}
        <button
          className="mobile-menu-button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
      </div>
    </header>
  )
}

export default SiteHeader
