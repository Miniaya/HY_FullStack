import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ListGroup,
} from 'react-bootstrap'

import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    )
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      <ListGroup>
        {blogs.sort((a, b) => -(a.likes - b.likes)).map(blog =>
          <ListGroup.Item as={Link} to={`/blogs/${blog.id}`} key={blog.id}>
            {blog.title} {blog.author}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList