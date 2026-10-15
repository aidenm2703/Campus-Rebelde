function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#/" aria-label="Campus Rebeldes, inicio">
        <span className="brand-mark" aria-hidden="true">c.</span>
        <span>campus <strong>rebeldes</strong></span>
      </a>
      <span>Aprender nos hace libres. Hecho con cariño para la comunidad.</span>
      <nav className="footer-links" aria-label="Enlaces de información">
        <a href="#/quienes-somos">Quiénes somos</a>
        <a href="#/contactos">Contactos</a>
        <a href="#/glosario">Glosario LGBT+</a>
      </nav>
      <a className="back-to-top" href="#/">Volver arriba ↑</a>
    </footer>
  )
}

export default SiteFooter
