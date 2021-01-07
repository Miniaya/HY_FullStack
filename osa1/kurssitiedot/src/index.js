import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {

  const parts = props.parts
  const newParts = parts.map(value => 
    <Part key={value.name} part={value.name} exercises={value.exercises} />
  )

  return (
    <div>
      {newParts}
    </div>
  )
}

const Total = (props) => {

  const parts = props.parts
  let sum = 0
  parts.forEach(value => sum += value.exercises)

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
