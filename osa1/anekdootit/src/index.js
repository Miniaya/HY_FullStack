import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNextClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setMostVotes(copy.indexOf(Math.max(...copy)))
    setPoints(copy)
  }

  return (
    <div>
      <Header header='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='Next anecdote' />
      <Header header='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVotes]} votes={points[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
