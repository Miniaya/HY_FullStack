/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavLink,
} from 'react-bootstrap'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import {
  initializeLogin,
  logoutUser,
} from './reducers/userReducer'
import {
  likeBlog,
  removeBlog,
  initializeBlogs,
  addComment,
} from './reducers/blogReducer'

import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const loggedUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [])

  useEffect(() => {
    userService.getAll()
      .then(returnedUsers => {
        setUsers(returnedUsers)
      })
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleBlogLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    dispatch(likeBlog(blog))
  }

  const handleBlogDelete = (id) => {
    dispatch(removeBlog(id))
  }

  const handleCommentAdd = (comment) => {
    dispatch(addComment(comment))
  }

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (loggedUser === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <NavLink as={Link} to="/">Blogs</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to="/users">Users</NavLink>
            </Nav.Item>
          </Nav>
          <Nav>
            <Navbar.Text>
              {loggedUser.name} logged in
            </Navbar.Text>
            <Nav.Item>
              <NavLink onClick={handleLogout}>Log out</NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2>Blog app</h2>

      <Notification message={message} type='success' />

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            blog={blog}
            loggedUser={loggedUser}
            likeBlog={handleBlogLike}
            deleteBlog={handleBlogDelete}
            addComment={handleCommentAdd}
          />
        </Route>
        <Route path="/">
          <BlogList blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default App