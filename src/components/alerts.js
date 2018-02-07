import React from 'react'
import PropTypes from 'prop-types'

const Alerts = props => {
  const { alerts, children } = props

  const renderAlerts = () =>
    alerts.map(alert => React.cloneElement(children, { alert, key: alert.id }))

  return (
    <div id="messages">
      {renderAlerts()}
    </div>
  )
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.element.isRequired
}

export default Alerts
