import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'You are welcome' }
  })
  fireEvent.change(author, {
    target: { value: 'Jonathan Young' }
  })
  fireEvent.change(url, {
    target: { value: 'example.org' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'You are welcome',
    author: 'Jonathan Young',
    url: 'example.org',
  })
})