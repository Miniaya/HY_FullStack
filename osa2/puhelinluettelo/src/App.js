import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/contacts'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ classId, setClassId ] = useState(notification)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => person.name === newName) >= 0) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setClassId('notification')
          setNotification(
            `${changedPerson.name}'s number was updated to ${changedPerson.number}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)

          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          setClassId('error')
          setNotification(
            `${changedPerson.name} was already removed from the server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== changedPerson.id))
        })

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setClassId('notification')
          setNotification(
            `${returnedPerson.name} was added to the Phonebook`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
        })

    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    personService
      .deletePerson(id)
      .then(returnedPerson => {
        setClassId('notification')
        setNotification(
          `${person.name} was deleted from the Phonebook`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} classId={classId} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow} 
        deletePerson={deletePerson} 
      />
    </div>
  )

}

export default App