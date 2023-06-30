import React, { Component } from 'react'

const NewsItem = () =>{

    let{title, description, imageUrl, newsUrl, author, date, source} = this.props; 
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://th.bing.com/th/id/OIP.ZII4BmF6lWq7tgUly_qgRwHaEs?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" : imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem