import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component, likeBlog

  const blog = {
    likes: 3,
    author: 'Jonathan Young',
    title: 'You are welcome',
    url: 'example.org',
    user: {
      name: 'Hemuli'
    }
  }

  const user = {
    name: 'Hemuli'
  }

  beforeEach(() => {
    likeBlog = jest.fn()
    component = render(
      <Blog blog={blog} loggedUser={user} likeBlog={likeBlog} />
    )
  })

  test('initially only title and author are shown', () => {
    const div = component.container.querySelector('.blogContent')

    expect(div).toHaveTextContent('Jonathan Young')
    expect(div).toHaveTextContent('You are welcome')
    expect(div).not.toHaveTextContent('example.org')
    expect(div).not.toHaveTextContent('3')
  })

  test('url and likes are shown when button is pressed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogContent')
    expect(div).toHaveTextContent('example.org')
    expect(div).toHaveTextContent('3')
  })

  test('pressing like button calls handler twice', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})