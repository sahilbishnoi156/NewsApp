import './App.css';
import { useState } from 'react';
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API1;

  const setProg = (progress) => {
    setProgress(progress);
  };

  return (
    <Router>
      <div className="navbar" style={{ height: "62px" }}>
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Navbar />
      </div>
      <div className="d-flex justify-content-center">
        <div
          className={`container m-5 bg-dark p-4 rounded-5 border border-4 d-flex justify-content-center`}
          style={{ boxShadow: `.1px .1px 26px black}` }}
        >
          <Routes>
            <Route
              exact
              path="/sports"
              element={<News setProgress={setProg} apiKey={apiKey} key="sports" category="sports" />}
            ></Route>
            <Route
              exact
              path="/science"
              element={<News setProgress={setProg} apiKey={apiKey} key="science" category="science" />}
            ></Route>
            <Route
              exact
              path="/general"
              element={<News setProgress={setProg} apiKey={apiKey} key="general" category="general" />}
            ></Route>
            <Route
              exact
              path="/business"
              element={<News setProgress={setProg} apiKey={apiKey} key="business" category="business" />}
            ></Route>
            <Route
              exact
              path="/health"
              element={<News setProgress={setProg} apiKey={apiKey} key="health" category="health" />}
            ></Route>
            <Route
              exact
              path="/technology"
              element={<News setProgress={setProg} apiKey={apiKey} key="technology" category="technology" />}
            ></Route>
            <Route
              exact
              path="/News-Monkey"
              element={<News setProgress={setProg} apiKey={apiKey} key="News-Monkey" category="general" />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
