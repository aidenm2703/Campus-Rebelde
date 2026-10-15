import { useMemo, useState } from 'react'
import CourseCard from '../components/CourseCard.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import Modal from '../components/Modal.jsx'
import { categories, courses } from '../data/courses.js'
import '../styles/App.css'

const initialModal = { type: '', step: 0, course: null }

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(initialModal)
  const [notice, setNotice] = useState('')
  const [userName, setUserName] = useState('')

  const visibleCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === 'Todos' || course.category === activeCategory
      const matchesSearch =
        !normalizedSearch ||
        `${course.title} ${course.teacher} ${course.category}`
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  function openModal(type, course = null, step = 0) {
    setNotice('')
    setModal({ type, course, step })
  }

  function closeModal() {
    setModal(initialModal)
  }

  function showNotice(message) {
    closeModal()
    setNotice(message)
    window.setTimeout(() => setNotice(''), 4500)
  }

  function signIn(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const displayName = name || email?.split('@')[0] || 'amigue'

    setUserName(displayName)
    closeModal()

    if ('speechSynthesis' in window) {
      const greeting = new SpeechSynthesisUtterance(`¡Bienvenide, ${displayName}!`)
      greeting.lang = 'es-MX'
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(greeting)
    }

    setNotice(`¡Qué gusto tenerte aquí, ${displayName}!`)
    window.setTimeout(() => setNotice(''), 4500)
  }

  function submitCreator(event) {
    event.preventDefault()
    showNotice('Tu propuesta quedó lista para revisión en este prototipo.')
  }

  function submitAidRequest(event) {
    event.preventDefault()
    showNotice('Tu solicitud quedó lista para revisión en este prototipo.')
  }

  function renderModalContent() {
    if (modal.type === 'creator') {
      if (modal.step === 0) {
        return (
          <>
            <span className="modal-eyebrow">Crear para compartir</span>
            <h2>El conocimiento también abre caminos.</h2>
            <p>
              Nuestra comunidad ha enfrentado discriminación incluso en las
              aulas. Muchas personas han tenido que salir de casa o no han
              podido continuar sus estudios. En Campus Rebeldes compartimos
              conocimiento útil a precios accesibles, para que aprender no sea
              un privilegio.
            </p>
            <div className="community-note">
              <span aria-hidden="true">✳</span>
              <p>
                Cada propuesta es revisada antes de publicarse. Buscamos
                contenido claro, de calidad y respetuoso con la diversidad.
              </p>
            </div>
            <button
              className="button button-primary button-full"
              onClick={() => setModal({ ...modal, step: 1 })}
            >
              Continuar con mi curso <span aria-hidden="true">→</span>
            </button>
          </>
        )
      }

      return (
        <>
          <span className="modal-eyebrow">Propuesta de curso</span>
          <h2>Comparte lo que sabes.</h2>
          <p className="form-intro">
            Los cursos enviados pasan por revisión antes de aparecer en el
            catálogo.
          </p>
          <form className="stacked-form" onSubmit={submitCreator}>
            <label>
              Nombre del curso
              <input name="title" required placeholder="Ej. Finanzas para empezar" />
            </label>
            <label>
              ¿Qué aprenderá la comunidad?
              <textarea name="description" required rows="3" placeholder="Describe el contenido y sus objetivos" />
            </label>
            <label>
              Precio sugerido (MXN)
              <input name="price" type="number" min="0" step="1" required placeholder="Ej. 150" />
            </label>
            <label className="checkbox-row">
              <input type="checkbox" required />
              <span>Mi contenido es de calidad y no discrimina a ninguna persona.</span>
            </label>
            <button className="button button-primary button-full" type="submit">
              Enviar propuesta <span aria-hidden="true">→</span>
            </button>
          </form>
        </>
      )
    }

    if (modal.type === 'aid') {
      if (modal.step === 0) {
        return (
          <>
            <span className="modal-eyebrow">Apoyo comunitario</span>
            <h2>Queremos que puedas aprender.</h2>
            <p>
              Mantenemos precios accesibles para que más personas puedan
              estudiar. Si aun así pagar este curso no está a tu alcance, puedes
              contarnos un poco de tu situación; revisaremos tu solicitud con
              cuidado y respeto.
            </p>
            <div className="community-note">
              <span aria-hidden="true">♡</span>
              <p>Tu solicitud es privada y no afecta tu acceso al resto de la plataforma.</p>
            </div>
            <button
              className="button button-primary button-full"
              onClick={() => setModal({ ...modal, step: 1 })}
            >
              Continuar con la solicitud <span aria-hidden="true">→</span>
            </button>
          </>
        )
      }

      return (
        <>
          <span className="modal-eyebrow">Solicitud confidencial</span>
          <h2>Cuéntanos qué necesitas.</h2>
          <p className="form-intro">
            Curso: <strong>{modal.course?.title}</strong>
          </p>
          <form className="stacked-form" onSubmit={submitAidRequest}>
            <label>
              ¿Por qué no puedes pagar este curso en este momento?
              <textarea name="reason" required minLength="10" rows="5" placeholder="Comparte solo lo que te sientas cómode contando." />
            </label>
            <button className="button button-primary button-full" type="submit">
              Enviar solicitud <span aria-hidden="true">→</span>
            </button>
          </form>
        </>
      )
    }

    if (modal.type === 'auth') {
      return (
        <>
          <span className="modal-eyebrow">Tu espacio de aprendizaje</span>
          <h2>{userName ? 'Tu cuenta' : 'Hola, qué bueno verte.'}</h2>
          <p className="form-intro">
            Inicia sesión o crea una cuenta para acceder a tu espacio personal.
          </p>
          <form className="stacked-form" onSubmit={signIn}>
            <label>
              Nombre (opcional al iniciar sesión)
              <input name="name" autoComplete="name" placeholder="¿Cómo te llamas?" />
            </label>
            <label>
              Correo electrónico
              <input name="email" type="email" autoComplete="email" required placeholder="tu@correo.com" />
            </label>
            <label>
              Contraseña
              <input name="password" type="password" autoComplete="current-password" minLength="8" required placeholder="Mínimo 8 caracteres" />
            </label>
            <button className="button button-primary button-full" type="submit">
              Entrar al prototipo <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="prototype-note">
            El registro seguro se conectará al backend en el siguiente paso.
          </p>
        </>
      )
    }

    return null
  }

  return (
    <div className="app-shell">
      <SiteHeader
        activeSection="home"
        onCreateCourse={() => openModal('creator')}
        onLogin={() => openModal('auth')}
        userName={userName}
      />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="hero-kicker"><span></span> APRENDER EN COMUNIDAD</div>
            <h1>El futuro que imaginas <em>también es tuyo.</em></h1>
            <p>
              Cursos prácticos, precios justos y una comunidad que cree en ti.
              Aprende algo nuevo, a tu manera y a tu ritmo.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#cursos">
                Encuentra tu próximo curso <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#comunidad">Conoce nuestra misión <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>✿</span><span>✦</span><span>♡</span>
              </div>
              <span>Un espacio seguro para aprender y crecer</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Ilustración de una persona estudiando">
            <div className="sun-shape"></div>
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>
            <div className="hero-art-label label-top"><span>✳</span> TU HISTORIA, TU CAMINO</div>
            <div className="hero-photo">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85"
                alt="Persona joven sonriendo en un espacio luminoso"
              />
            </div>
            <div className="floating-card">
              <span className="floating-icon">✦</span>
              <span><strong>Aprender</strong><small>sin pedir permiso</small></span>
            </div>
            <div className="hero-art-label label-bottom">conocimiento que acompaña <span>↗</span></div>
          </div>
        </section>

        <section className="community-strip" id="comunidad">
          <span className="strip-flower" aria-hidden="true">✳</span>
          <p>
            Un espacio creado desde y para nuestra comunidad. <strong>Aprender también es una forma de rebelarse.</strong>
          </p>
          <a href="#cursos" aria-label="Explorar cursos">↓</a>
        </section>

        <section className="catalog-section" id="cursos">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">APRENDE ALGO NUEVO</span>
              <h2>Tu próximo comienzo.</h2>
            </div>
            <div className="catalog-search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Buscar cursos"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="¿Qué te gustaría aprender?"
              />
              <kbd>⌘ K</kbd>
            </div>
          </div>

          <div className="catalog-toolbar">
            <div className="category-list" aria-label="Categorías de cursos">
              {categories.map((category) => (
                <button
                  className={`category-chip ${activeCategory === category ? 'selected' : ''}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="course-count">{visibleCourses.length} cursos para explorar</span>
          </div>

          <div className="course-grid">
            {visibleCourses.map((course) => (
              <CourseCard
                course={course}
                key={course.id}
                onAidRequest={() => openModal('aid', course, 0)}
                onEnroll={() => openModal('auth')}
              />
            ))}
          </div>
          {visibleCourses.length === 0 && (
            <div className="empty-state">
              <span aria-hidden="true">✳</span>
              <h3>Todavía no encontramos ese curso.</h3>
              <p>Prueba con otra búsqueda o explora todas las categorías.</p>
              <button
                className="text-link"
                onClick={() => { setSearch(''); setActiveCategory('Todos') }}
              >
                Ver todos los cursos
              </button>
            </div>
          )}
        </section>

        <section className="creator-banner">
          <div className="banner-symbol" aria-hidden="true">✳</div>
          <div>
            <span className="section-eyebrow">EL SABER SE COMPARTE</span>
            <h2>Lo que sabes puede cambiar una vida.</h2>
            <p>Crea un curso, comparte tu experiencia y crezcamos en comunidad.</p>
          </div>
          <button className="button button-dark" onClick={() => openModal('creator')}>
            Crear un curso <span aria-hidden="true">↗</span>
          </button>
        </section>
      </main>

      <SiteFooter />

      {notice && <div className="toast" role="status">{notice}</div>}
      {modal.type && (
        <Modal onClose={closeModal}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  )
}

export default App
