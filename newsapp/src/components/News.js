import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults]= useState(0)
  // document.title = `${this.capitlizeText(props.category)} - TimesNews`;

  // Capitalize the first letter of category title on browser tab 
  const capitlizeText = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => { 

    props.changeProgress(10);
  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.changeProgress(30);
    let parsedData = await data.json();
    props.changeProgress(50);
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.changeProgress(100);

  }

  useEffect(() => {
  
    updateNews();

  }, [])

  const handlePreviousClick = async() =>{

    setPage(page - 1)
    updateNews();
  }

  const handleNextClick = async() =>{
    
    setPage(page + 1)
    updateNews();
  }


  fetchMoreData = async() => {

    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

    return (
      <> 
        <h1 className='text-center'>TimesNews - Top {this.capitlizeText(props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}  

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}> 
        
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} 
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author: 'Vikram Chandra'} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}


News.defaultProps = {

    country : "in",
    pageSize : 8,
    category : 'general'
}

News.propTypes = {

    country : PropTypes.string, 
    pageSize : PropTypes.number,
    category : PropTypes.string
}

export default News
