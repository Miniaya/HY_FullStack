/* eslint-disable no-empty */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage(
        'Wrong username or password'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogUser')
      blogService.setToken(null)
      setUser(null)

    } catch (exception) {

    }
  }

  const handleBlogLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        const rBlog = { ...returnedBlog, user: blog.user }
        setBlogs(blogs.map(blog => blog.id !== id ? blog : rBlog))
      })
  }

  const handleBlogDelete = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{ user.name } logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      <div id="blogs">
        {blogs.sort((a, b) => -(a.likes - b.likes)).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user}
            likeBlog={handleBlogLike}
            deleteBlog={handleBlogDelete}
          />
        )}
      </div>
    </div>
  )
}

export default App