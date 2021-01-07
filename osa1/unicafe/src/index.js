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

const StatisticLine = ({ text, number }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad
  let average = (good - bad) / sum
  let positive = 100 * (good / sum)

  if(good===0 && neutral===0 && bad===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' number={good} />
        <StatisticLine text='neutral' number={neutral} />
        <StatisticLine text='bad' number={bad} />
        <StatisticLine text='all' number={sum} />
        <StatisticLine text='average' number={Math.round(average * 10) / 10} />
        <StatisticLine text='positive' number={Math.round(positive * 10) / 10 + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <Header header='Give Feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header header='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
