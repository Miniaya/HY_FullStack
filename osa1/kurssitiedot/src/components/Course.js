import React from 'react'

const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, curr) => sum + curr.exercises, 0 )
  
    return (
      <div>
        <strong>Total of exercises {total}</strong>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course