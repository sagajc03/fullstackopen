import { useState, useEffect } from 'react'
import './index.css'
import PhonebookList from './components/PhonebookList'
import AddNewPerson from './components/AddNewPerson'
import FilterZone from './components/FilterZone'
import phoneService from "./services/backendHandle";
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    console.log('effect');
    phoneService
      .getAll()
      .then(people => {
        setPersons(people)
        setFilteredPersons(people)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newPhone,
    }

    const search = persons.find(person => person.name === newName)

    const helperReset = () => {
        setNewName('')
        setNewPhone('')
        setFilterTerm('')
    }

    if (search) {
      const message = `${newName} is already added to phonebook, do you want to update the phone number`
      window.confirm(message)
      phoneService
        .update(search.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === search.id ? returnedPerson : person))
          setFilteredPersons(persons.map(person => person.id === search.id ? returnedPerson : person))
          helperReset()
        })
        .catch( error => {
          helperReset()
          phoneService
            .getAll()
            .then(people => {
              setPersons(people)
              setFilteredPersons(people)
            })
          setError(`Information of ${personObject.name} has already beeen removed from the server`)
          setTimeout(() => {
            setError(null)
          },5000)
        })

    }
    console.log("crear")
    phoneService
      .create(personObject)
      .then((person) => {
        console.log(person)
        setPersons(persons.concat(person))
        helperReset()
        setFilteredPersons(persons.concat(person))
        setNotification(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotification(null)
          },5000)
      })
      .catch((error) => {
        console.log(error.response.data.error)
        setError(`${error.response.data.error}`)
          setTimeout(() => {
            setError(null)
          },5000)
      })
      
    
  }

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const onChangePhone = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value)
  }

  const onChangeFilter = (event) => {
    const term = event.target.value
    setFilterTerm(term)
    if (term === '') {
      setFilteredPersons(persons)
      return
    }
    const filterItems = persons.filter(person => person.name.toLowerCase().includes(term.toLowerCase()))

    setFilteredPersons(filterItems)
  }

  const onClickDelete = (id) => {
    if(window.confirm("Do you want to delete this person?")) {
      phoneService.deletePerson(id)
      .then((person) => {
        setFilteredPersons(persons.filter(n => n.id !== id))
        setPersons(persons.filter(n => n.id !== id))
      })
      .catch( error => {
        alert('Something happenend' +  error + id)
      }

      )

    }
  }

  return (
    <div>
      <ErrorNotification message={error} />
      <Notification message={notification}/>
      <FilterZone onChangeFilter={onChangeFilter} filterTerm={filterTerm} />
      <AddNewPerson addNewName={addNewName} onChangeName={onChangeName} onChangePhone={onChangePhone} newName={newName} newPhone={newPhone} />
      <PhonebookList persons={filteredPersons} onClickDelete={onClickDelete} />
    </div>
  )
}

export default App