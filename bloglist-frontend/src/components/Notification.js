import React from 'react'

const Notification = ({ message , msgtype }) => {
  if (message === null || message==='') {
    return null
  }

  if (msgtype === "error") {
    ;
  } else {
    msgtype = "info"
  }

  //console.log('Notification abt: ', message , 'msgtype:', msgtype)
    return (
    <div className={msgtype}>
      {message}
    </div>
    )

}

export default Notification