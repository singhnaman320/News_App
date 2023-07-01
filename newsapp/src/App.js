import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// To get Switch install react route dom version below 6.0.0 --> "npm install react-router-dom@5.2.0"
import{BrowserRouter as Router, Switch, Route}from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  
  const pageSize=8;

  const apiKey = process.env.REACT_APP_NEWS_API; // Reading API Key from .env.local file

  // For Top loding bar
  const [progress, setProgress] = useState(0)

  // For Top loding bar
 

  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Switch>
          <Route exact path="/">
            <News changeProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country="in" category="general"/> {/* All categories you can see from News API */}
          </Route>
          <Route exact path="/business">
            <News changeProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>
          </Route>
          <Route exact path="/entertainment">
            <News changeProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>
          </Route>
          <Route exact path="/general">
            <News changeProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>
          </Route>
          <Route exact path="/health">
            <News changeProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>
          </Route>
          <Route exact path="/science">
            <News changeProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>
          </Route>
          <Route exact path="/sports">
            <News changeProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>
          </Route>
          <Route exact path="/technology">
            <News changeProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>
          </Route>
        </Switch>
      </Router>
    </div>
    )
}


