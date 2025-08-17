const AddNewPerson = ({onChangePhone, newPhone, onChangeName , newName , addNewName}) => (
  <div>
      <h2>Add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={onChangeName} value={newName}/>
        </div>
        <div>
          Phone: <input onChange={onChangePhone} value={newPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
)

export default AddNewPerson