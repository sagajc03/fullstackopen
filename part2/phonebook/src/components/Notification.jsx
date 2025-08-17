const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let notificationStyle = {
    color: 'green'
  } 

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}
export default Notification