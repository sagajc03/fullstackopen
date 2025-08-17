const PhoneListRow = ({idPerson, name, number, onClick}) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
    <td><button onClick={() => onClick(idPerson)}>delete</button></td>
  </tr>
)

const PhoneListHead = ({name, phone}) => (
    <thead>
      <tr>
        <th>
          {name}
        </th>
        <th>
          {phone}
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
)

const PhonebookList = ({persons, onClickDelete}) => (
  <div>
      <h2>Numbers</h2>
      <table>
        <PhoneListHead name={'Name'} phone={'Phone number'} />
        <tbody>
          {persons.map(person => (
            <PhoneListRow  key={person.id} name={person.name} number={person.number} onClick={onClickDelete} idPerson={person.id}/>
          )
          )}
        </tbody>
        </table>
  </div>
)

export default PhonebookList