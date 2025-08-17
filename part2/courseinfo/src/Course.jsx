const Header = ({name}) => {
  return (
  <>
    <h1>{name}</h1>
  </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises } />)}
  </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((acummulator,current) => acummulator+current.exercises, 0)
  return (
  <strong>
    <p>Number of exercises {total}</p>
  </strong>
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course