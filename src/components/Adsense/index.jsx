import React from 'react'
import './style.css'

class Adsense extends React.Component {
  componentDidMount() {
    const { clientId } = this.props
    if (clientId && window) {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }

  render() {
    const { clientId, slotId, format } = this.props
    console.log(clientId)

    return clientId ? (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
        />
      </div>
    ) : (
      ''
    )
  }
}
export default Adsense
