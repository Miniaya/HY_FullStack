import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id
        ? blog
        : action.data
    )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'ADD_COMMENT':
    return state.map(blog =>
      blog.id !== action.data.blog_id
        ? blog
        : { ...blog, comments: blog.comments.concat(action.data.comment) }
    )
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments.map(comment => comment.id)
    }
    const updatedBlog = await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        ...updatedBlog,
        user: blog.user,
        comments: blog.comments
      },
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export const addComment = (comment) => {
  return async dispatch => {
    const newComment = await blogService.addComment(comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        comment: newComment,
        blog_id: comment.blog,
      }
    })
  }
}

export default blogReducer