import { useMemo, useState } from 'react'
import InfoPageLayout from '../components/InfoPageLayout.jsx'
import { glossaryTerms } from '../data/glossaryTerms.js'
import '../styles/InfoPages.css'

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
}

function GlossaryPage() {
  const [search, setSearch] = useState('')
  const filteredTerms = useMemo(() => {
    const query = normalizeText(search.trim())

    if (!query) return glossaryTerms

    return glossaryTerms.filter((term) =>
      normalizeText(`${term.word} ${term.definition}`).includes(query),
    )
  }, [search])

  return (
    <InfoPageLayout activeSection="glossary">
      <section className="info-hero glossary-hero">
        <span className="section-eyebrow">APRENDER TAMBIÉN ES NOMBRARNOS</span>
        <h1>Un glosario para hablar <em>con respeto.</em></h1>
        <p>
          Algunas palabras ayudan a comprender nuestras experiencias. Las
          identidades son personales: cada quien decide cómo nombrarse.
        </p>
        <label className="glossary-search">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Buscar un término"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca un término"
          />
        </label>
        <span className="info-hero-flower" aria-hidden="true">✳</span>
      </section>

      <section className="info-section glossary-section">
        <div className="glossary-heading">
          <div>
            <span className="section-eyebrow">VOCABULARIO INCLUSIVO</span>
            <h2>Palabras que nos acercan.</h2>
          </div>
          <span>
            {filteredTerms.length} {filteredTerms.length === 1 ? 'término' : 'términos'}
          </span>
        </div>
        {filteredTerms.length > 0 ? (
          <dl className="glossary-list">
            {filteredTerms.map((term) => (
              <div className="glossary-item" key={term.word}>
                <dt>{term.word}</dt>
                <dd>{term.definition}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="contacts-empty glossary-empty">
            <span aria-hidden="true">⌕</span>
            <div>
              <h3>No encontramos ese término.</h3>
              <p>Prueba con otra palabra para recorrer el glosario.</p>
            </div>
          </div>
        )}
        <p className="glossary-note">
          El lenguaje cambia y no todas las personas usan las mismas palabras.
          Si alguien te comparte sus pronombres o cómo desea ser nombrade,
          respeta esa forma de llamarle.
        </p>
      </section>
    </InfoPageLayout>
  )
}

export default GlossaryPage
