import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <>
        <h1 className='PgNtFnd'>PageNotFound :\</h1>
        <h1 className='goBack'>Go to the Home Page: <Link to={'/'}>Home Page</Link></h1>
    </>
  )
}
