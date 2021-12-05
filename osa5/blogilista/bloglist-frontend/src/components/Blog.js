import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blogContent">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowFull(!showFull)}>{showFull ? 'hide' : 'show'}</button>
      </div>
      {showFull && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button id="like-button" onClick={() => likeBlog(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {loggedUser.username === blog.user.username && (
            <button onClick={handleBlogDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog