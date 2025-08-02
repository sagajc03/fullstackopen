import { useState } from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StadisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Stadistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all != 0){
    return (
      <div>
        <h1>stadistics</h1>
        <table> 
          <tbody>
            <StadisticLine text={'Good'} value={good} />
            <StadisticLine text={'Neutral'} value={neutral} />
            <StadisticLine text={'Bad'} value={bad} />
            <StadisticLine text={'All'} value={all} />
            <StadisticLine text={'Average'} value={(good - bad)/(all)} />
            <StadisticLine text={'Positive'} value={((good/(all)) * 100 || 0) + '%'} />
          </tbody>
        </table>
      </div>
    ) 
  }
  else {
    return (
      <div>
        <p>No feedback given, give us ur opinion</p>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => (
    setGood(good+1)
  )
  const handleNeutral = () => (
    setNeutral(neutral+1)
  )
  const handleBad = () => (
    setBad(bad+1)
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={handleGood} />
      <Button text={'neutral'} onClick={handleNeutral} />
      <Button text={'bad'} onClick={handleBad} />
      <Stadistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App