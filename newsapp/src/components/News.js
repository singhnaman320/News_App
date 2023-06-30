import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = () => {

  const [articles, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults]= useState(0)
  // document.title = `${this.capitlizeText(this.props.category)} - TimesNews`;

  // Capitalize the first letter of category title on browser tab 
  capitlizeText(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => { 

    this.props.changeProgress(10);
  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    this.props.changeProgress(30);
    let parsedData = await data.json();
    this.props.changeProgress(50);
    console.log(parsedData);
    this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    });

    this.props.changeProgress(100);

  }

  async componentDidMount(){

    this.updateNews();
  }

  fetchMoreData = async() => {

    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <> 
        <h1 className='text-center'>TimesNews - Top {this.capitlizeText(this.props.category)} Headlines</h1>
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
