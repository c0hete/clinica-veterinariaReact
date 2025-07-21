import React from 'react'

const Alert = ({ type = 'danger', message }) => {
  if (!message) return null

  return (
    <div className={`alert alert-${type} mt-2`} role="alert">
      {message}
    </div>
  )
}

export default Alert
