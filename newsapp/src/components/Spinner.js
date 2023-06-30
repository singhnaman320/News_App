import React from 'react'
import loading from './loading.gif'

const Spinner = () => {
    return (
      <div className='text-center'>
        <img  id='spinner' className='my-3' src={loading} alt="loading here" />
      </div>
    )
}
export default Spinner