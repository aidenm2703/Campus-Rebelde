import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

function InfoPageLayout({ activeSection, children }) {
  return (
    <div className="app-shell">
      <SiteHeader activeSection={activeSection} />
      <main className="info-main">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default InfoPageLayout
