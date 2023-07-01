import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// To get Switch install react route dom version below 6.0.0 --> "npm install react-router-dom@5.2.0"
import{BrowserRouter as Router, Switch, Route}from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  
  const pageSize=8;

  const apiKey = process.env.REACT_APP_NEWS_API; // Reading API Key from .env.local file

  // For Top loding bar
  state = {
    progress: 0
  }

  // For Top loding bar
  setProgress = (progress) => {

    this.setState({progress : progress})
  }


  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
        />
        <Switch>
          <Route exact path="/">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country="in" category="general"/> {/* All categories you can see from News API */}
          </Route>
          <Route exact path="/business">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>
          </Route>
          <Route exact path="/entertainment">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>
          </Route>
          <Route exact path="/general">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>
          </Route>
          <Route exact path="/health">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>
          </Route>
          <Route exact path="/science">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>
          </Route>
          <Route exact path="/sports">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>
          </Route>
          <Route exact path="/technology">
            <News changeProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>
          </Route>
        </Switch>
      </Router>
    </div>
    )
}


