import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {

    country : "in",
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {

    country : PropTypes.string, 
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  // Capitalize the first letter of category title on browser tab 
  capitlizeText(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){

    super(props);
    console.log("Hello I an constructor from News Component")

    this.state= { 
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitlizeText(this.props.category)} - TimesNews`;
  }

  async updateNews(){

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

export default News
