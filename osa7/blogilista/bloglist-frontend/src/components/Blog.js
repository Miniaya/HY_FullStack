import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Form,
  Row,
  Col,
  Toast,
  ToastContainer
} from 'react-bootstrap'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog, addComment }) => {
  const history = useHistory()
  const [newComment, setNewComment] = useState('')

  const handleBlogDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  const handleCommentAdd = (event) => {
    event.preventDefault()
    addComment({
      blog: blog.id,
      comment: newComment
    })
    setNewComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button id="like-button" onClick={() => likeBlog(blog.id)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {loggedUser.username === blog.user.username && (
        <Button onClick={handleBlogDelete}>remove</Button>
      )}

      <hr />

      <h3>Comments</h3>
      <Form onSubmit={handleCommentAdd}>
        <Row>
          <Col xs='auto'>
            <Form.Control
              id="comment"
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            />
          </Col>
          <Col xs='auto'>
            <Button type="submit">add comment</Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer>
        {blog.comments.map(comment => (
          <Toast key={comment.id}>
            <Toast.Body>{comment.comment}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  )
}

Blog.propTypes = {
  loggedUser: PropTypes.object.isRequired
}

export default Blog