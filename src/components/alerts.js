import React from 'react'

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
  alerts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      style: React.PropTypes.string,
      id: React.PropTypes.string
    })
  ).isRequired,
  children: React.PropTypes.element.isRequired
}

export default Alerts
