import InfoPageLayout from '../components/InfoPageLayout.jsx'
import { organizations } from '../data/organizations.js'
import '../styles/InfoPages.css'

const organizationTypes = [
  {
    icon: '♡',
    title: 'Acompañamiento y bienestar',
    description: 'Orientación y espacios de escucha para personas LGBT+.',
  },
  {
    icon: '✳',
    title: 'Derechos y asesoría',
    description: 'Recursos para conocer y defender nuestros derechos.',
  },
  {
    icon: '↗',
    title: 'Comunidad y redes',
    description: 'Colectivos, grupos y espacios para encontrarnos.',
  },
]

function ContactsPage() {
  return (
    <InfoPageLayout activeSection="contacts">
      <section className="info-hero contacts-hero">
        <span className="section-eyebrow">RED DE APOYO</span>
        <h1>Una comunidad también es saber <em>a quién acudir.</em></h1>
        <p>
          Estamos preparando una guía de organizaciones y recursos para la
          comunidad. Aquí iremos sumando los contactos que compartas.
        </p>
        <span className="info-hero-flower" aria-hidden="true">♡</span>
      </section>

      <section className="info-section contacts-guide">
        <div className="info-section-heading">
          <span className="section-eyebrow">GUÍA DE CONTACTOS</span>
          <h2>Recursos de la comunidad, reunidos en un solo lugar.</h2>
          <p>
            La guía está lista para crecer. Aún no se han añadido organizaciones;
            cuando compartas sus datos, podremos ordenarlos aquí para que sea
            sencillo encontrar cada recurso.
          </p>
        </div>
        <div className="organization-types">
          {organizationTypes.map((type) => (
            <article className="organization-type" key={type.title}>
              <span className="organization-icon" aria-hidden="true">{type.icon}</span>
              <div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            </article>
          ))}
        </div>
        {organizations.length > 0 ? (
          <div className="organization-directory">
            {organizations.map((organization) => (
              <article className="directory-card" key={organization.name}>
                <div className="directory-card-heading">
                  <div>
                    <span className="directory-category">{organization.category}</span>
                    <h3>{organization.name}</h3>
                  </div>
                  {organization.website && (
                    <a
                      className="directory-website"
                      href={organization.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visitar sitio ↗
                    </a>
                  )}
                </div>
                <p>{organization.description}</p>
                <div className="directory-contact">
                  {organization.phone && <span>Tel. {organization.phone}</span>}
                  {organization.email && <a href={`mailto:${organization.email}`}>{organization.email}</a>}
                  {organization.address && <span>{organization.address}</span>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="contacts-empty">
            <span aria-hidden="true">✳</span>
            <div>
              <h3>Pronto habrá más redes aquí.</h3>
              <p>
                Esta guía se completará con las organizaciones y formas de
                contacto que nos proporciones. No incluimos datos sin verificar.
              </p>
            </div>
            <span className="coming-soon">GUÍA EN CRECIMIENTO</span>
          </div>
        )}
      </section>

      <section className="contacts-note">
        <strong>Nota importante</strong>
        <p>
          La guía será informativa y no sustituye el apoyo profesional ni los
          servicios locales de emergencia. Cada organización tendrá sus propios
          horarios, condiciones y ámbitos de atención.
        </p>
      </section>
    </InfoPageLayout>
  )
}

export default ContactsPage
