import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, type }) => {
  if(message === null) {
    return null
  }

  return (
    <Alert className="notification" variant={type} >{message}</Alert>
  )
}

export default Notification