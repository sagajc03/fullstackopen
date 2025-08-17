const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  let notificationStyle = {
    color: 'red'
  } 

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}
export default ErrorNotification