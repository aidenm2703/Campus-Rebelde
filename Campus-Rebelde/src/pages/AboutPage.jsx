import InfoPageLayout from '../components/InfoPageLayout.jsx'
import '../styles/InfoPages.css'

const values = [
  {
    number: '01',
    title: 'El acceso también es justicia',
    description:
      'Procuramos que aprender sea posible con cursos útiles, precios accesibles y alternativas de apoyo para quien las necesite.',
  },
  {
    number: '02',
    title: 'Aprendemos en comunidad',
    description:
      'Reconocemos el conocimiento que ya existe en nuestras comunidades y abrimos espacio para compartirlo.',
  },
  {
    number: '03',
    title: 'Un espacio digno y respetuoso',
    description:
      'Promovemos contenidos libres de discriminación, con respeto a la identidad, la historia y la experiencia de cada persona.',
  },
]

function AboutPage() {
  return (
    <InfoPageLayout activeSection="about">
      <section className="info-hero about-hero">
        <span className="section-eyebrow">QUIÉNES SOMOS</span>
        <h1>Aprender en libertad, <em>crecer en comunidad.</em></h1>
        <p>
          Campus Rebeldes es una iniciativa de aprendizaje accesible pensada
          desde la solidaridad con la comunidad LGBT+.
        </p>
        <span className="info-hero-flower" aria-hidden="true">✳</span>
      </section>

      <section className="about-story info-section">
        <div className="info-section-heading">
          <span className="section-eyebrow">NUESTRA RAZÓN DE SER</span>
          <h2>El conocimiento debe abrir puertas, no cerrarlas.</h2>
        </div>
        <div className="about-story-copy">
          <p>
            Muchas personas LGBT+ han vivido discriminación en las aulas, han
            tenido que alejarse de sus hogares o no han contado con los recursos
            para continuar sus estudios. Esas barreras no hablan de falta de
            talento: hablan de oportunidades que no se han repartido de manera
            justa.
          </p>
          <p>
            Creamos este espacio para acercar herramientas y conocimientos
            prácticos a precios amables, y para que quienes tienen algo que
            enseñar puedan compartirlo con la comunidad. Queremos que aprender
            aquí se sienta posible, útil y digno.
          </p>
        </div>
      </section>

      <section className="values-section info-section">
        <div className="info-section-heading">
          <span className="section-eyebrow">LO QUE NOS GUÍA</span>
          <h2>Una comunidad que se cuida y se impulsa.</h2>
        </div>
        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span className="value-number">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-callout">
        <span aria-hidden="true">♡</span>
        <div>
          <h2>Esto lo construimos en colectivo.</h2>
          <p>Explora los cursos o conoce las organizaciones de apoyo que iremos sumando.</p>
        </div>
        <a className="button button-primary" href="#/cursos">Explorar cursos <span aria-hidden="true">→</span></a>
      </section>
    </InfoPageLayout>
  )
}

export default AboutPage
