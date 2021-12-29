const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET':
    return action.notification
  case 'RESET':
    return null
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return async dispatch => {
    dispatch(setNotificationText(notification))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}

const setNotificationText = (notification) => {
  return {
    type: 'SET',
    notification
  }
}

const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer