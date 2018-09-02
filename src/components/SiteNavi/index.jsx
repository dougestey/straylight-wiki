import React from 'react'
import Link from 'gatsby-link'
import axios from 'axios'
import './style.scss'

class SiteNavi extends React.Component {
  // TODO: This should be extracted to a service and should happen much earlier in the runtime
  componentDidMount() {
    axios
      .get('https://auth.straylight.systems/whoami', { withCredentials: true })
      .then(res => {
        if (res && res.status === 200 && res.data) this.setState(res.data)
      })
      .catch(e => {
        console.warn(e)

        // TODO: pretty crude, but it works when you don't know shit about routing in gatsby/react
        if (window.location.href.includes('protocol'))
          window.location.href = '/'
      })
  }

  render() {
    const { location, title } = this.props
    let authOrProtocolLink, applyLink

    // TODO: abstract to components
    if (this.state && this.state.isStraylight) {
      authOrProtocolLink = (
        <li
          className={
            location.pathname === '/protocol/' ? 'nav-item active' : 'nav-item'
          }
        >
          <Link to="/protocol/" className="nav-link">
            Protocol
          </Link>
        </li>
      )
    } else {
      authOrProtocolLink = (
        <li className="nav-item">
          <a
            href="https://auth.straylight.systems/authorize"
            className="nav-link"
            target="_self"
          >
            Login
          </a>
        </li>
      )

      applyLink = (
        <li
          className={
            location.pathname === '/apply/' ? 'nav-item active' : 'nav-item'
          }
        >
          <Link to="/apply/" className="nav-link">
            Apply
          </Link>
        </li>
      )
    }

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row bg-primary">
        <div className="container">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand text-primary mb-0 d-none d-md-block d-lg-block d-xl-block">
              {title}
            </h1>
            <h1 className="navbar-brand text-primary mb-0 d-block d-md-none d-lg-none d-xl-none">
              S-RUN
            </h1>
          </Link>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <li
                className={
                  location.pathname === '/journal/'
                    ? 'nav-item active'
                    : 'nav-item'
                }
              >
                <Link to="/journal/" className="nav-link">
                  Journal
                </Link>
              </li>
              <li
                className={
                  location.pathname === '/origin/'
                    ? 'nav-item active'
                    : 'nav-item'
                }
              >
                <Link to="/origin/" className="nav-link">
                  Origin
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://zkillboard.com/corporation/98498664/"
                  className="nav-link"
                  target="_blank"
                >
                  Kills
                </a>
              </li>

              {applyLink}

              {authOrProtocolLink}

              {/* TODO - maybe use a dropdown for protocol in the future
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Wiki
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a className="dropdown-item" href="#">
                    Doctrines
                  </a>
                  <a className="dropdown-item" href="#">
                    Making ISK
                  </a>
                  <a className="dropdown-item" href="#">
                    Communications
                  </a>
                </div>
              </li> */}
            </ul>
          </div>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default SiteNavi
