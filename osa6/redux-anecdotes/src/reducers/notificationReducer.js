const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.notification
    case 'RESET':
      return ''
    default:
      return state
  }
}

let lastTimeoutID

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(setNotificationText(notification))
    clearTimeout(lastTimeoutID)
    lastTimeoutID = setTimeout(() => {
      dispatch(resetNotificationText())
    }, time * 1000)
  }
}

const setNotificationText = (notification) => {
  return {
    type: 'SET',
    notification
  }
}

const resetNotificationText = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer