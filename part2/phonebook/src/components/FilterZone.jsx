const FilterZone = ({filterTerm, onChangeFilter}) => (
  <div>
    <h2>Phonebook</h2>
      <div>
        filter: <input type="text" value={filterTerm} onChange={onChangeFilter}/>
      </div>
  </div>
)

export default FilterZone