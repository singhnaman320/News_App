import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  id='spinner' className='my-3' src={loading} alt="loading here" />
      </div>
    )
  }
}

export default Spinner