import React from 'react'

interface IError {
  error: {
    message: string
  }
}

function ErrorLog({ error }: IError) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <pre style={{ color: 'black' }}>{error.message}</pre>
    </div>
  )
}

// ErrorLog.propTypes = {
//   error: PropTypes.any,
// }

export default ErrorLog
