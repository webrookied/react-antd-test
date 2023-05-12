import React, { useEffect } from 'react'
import cx from './style.module.scss'
import axios from 'axios'

const Uploader = () => {
  useEffect(() => {
    axios.get('/api/chat/list').then((res) => {
      console.log('chat/list:', res)
    })
  }, [])
  return <div className={cx.uploader}>Uploader</div>
}

export default Uploader
