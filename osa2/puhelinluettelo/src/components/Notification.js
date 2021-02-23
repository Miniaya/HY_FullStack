import React from 'react'

const Notification = ({ message, classId }) => {
    if(message === null) {
        return null
    }

    return (
        <div className={classId}>
            {message}
        </div>
    )
}

export default Notification