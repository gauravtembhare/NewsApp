
import './App.css';
import React, {  useState } from 'react'
import NavBar from './componets/NavBar';
import News from './componets/News';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  
  
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        {/* <News setProgress={setProgress}   pagesize={pageSize} country={'in'} category={'general'}/> */}
        <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="general" country="in" category="general"/>} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="general" country="in" category="general"/>} />
            <Route exact path="/sports" element={<News setProgress={setProgress}  apiKey={apiKey} pagesize={pageSize}  key="sports" country="in" category="sports"/>} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="science" country="in" category="science"/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="entertainment" country="in" category="entertainment"/>} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="business" country="in" category="business"/>} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="technology" country="in" category="technology"/>} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pageSize} key="health" country="in" category="health"/>} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  
}

export default App;